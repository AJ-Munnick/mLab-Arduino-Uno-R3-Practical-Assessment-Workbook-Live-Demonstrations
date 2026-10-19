(function(){
  const MAX_SIZE = 50 * 1024 * 1024;
  const DB_NAME = 'member-videos-db';
  const STORE = 'videos';

  function openDB(){
    return new Promise((resolve,reject)=>{
      if(!('indexedDB' in window)) return reject(new Error('IndexedDB not supported'));
      const r = indexedDB.open(DB_NAME,1);
      r.onupgradeneeded = ()=>{
        const db = r.result;
        if(!db.objectStoreNames.contains(STORE)){
          const s = db.createObjectStore(STORE,{keyPath:'key'});
          s.createIndex('memberId','memberId',{unique:false});
        }
      };
      r.onsuccess = ()=>resolve(r.result);
      r.onerror = ()=>reject(r.error);
    });
  }

  function putVideo(db, record){
    return new Promise((resolve,reject)=>{
      const tx = db.transaction([STORE],'readwrite');
      const store = tx.objectStore(STORE);
      const req = store.put(record);
      req.onsuccess = ()=>resolve();
      req.onerror = ()=>reject(req.error);
    });
  }

  function getVideo(db, key){
    return new Promise((resolve,reject)=>{
      const tx = db.transaction([STORE],'readonly');
      const store = tx.objectStore(STORE);
      const req = store.get(key);
      req.onsuccess = ()=>resolve(req.result);
      req.onerror = ()=>reject(req.error);
    });
  }

  function deleteVideo(db, key){
    return new Promise((resolve,reject)=>{
      const tx = db.transaction([STORE],'readwrite');
      const store = tx.objectStore(STORE);
      const req = store.delete(key);
      req.onsuccess = ()=>resolve();
      req.onerror = ()=>reject(req.error);
    });
  }

  function initForMember(memberName){
    const script = document.querySelector('script[data-member]');
    const member = (script && script.dataset.member) || memberName || 'Member';

    openDB().then(db=>{
      for(let i=1;i<=6;i++){
        const projectId = 'project-'+i;
        const slot = document.getElementById(projectId);
        if(!slot) continue;

        const placeholder = slot.querySelector('.video-placeholder') || slot.querySelector('.video-frame');
        const controls = document.createElement('div');
        controls.className = 'uploader-controls';

        const label = document.createElement('label');
        label.className = 'upload-button';
        label.textContent = 'Upload video';
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'video/*';
        input.dataset.member = member;
        input.dataset.project = projectId;
        input.style.position='absolute'; input.style.width='1px'; input.style.height='1px'; input.style.overflow='hidden'; input.style.clip='rect(0,0,0,0)';
        label.appendChild(input);

        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'button-text-danger';
        removeBtn.textContent = 'Remove uploaded video';
        removeBtn.style.display = 'none';

        controls.append(label, removeBtn);
        slot.appendChild(controls);

        // render existing
        (async function(){
          const key = `${member}:${projectId}`;
          const record = await getVideo(db,key).catch(()=>null);
          if(record && record.blob){
            const url = URL.createObjectURL(record.blob);
            const video = document.createElement('video');
            video.controls = true; video.className='video-player'; video.src = url;
            // replace iframe/placeholder
            if(placeholder) placeholder.replaceWith(video);
            removeBtn.style.display='inline-block';
            removeBtn.onclick = async ()=>{ await deleteVideo(db,key); video.remove(); removeBtn.style.display='none'; if(placeholder) slot.appendChild(placeholder); };
          }
        })();

        input.addEventListener('change', async (e)=>{
          const file = input.files && input.files[0];
          if(!file) return;
          if(file.size > MAX_SIZE){ alert('Video exceeds 50 MB limit'); input.value=''; return; }
          if(!file.type.startsWith('video/')){ alert('Please upload a video file'); input.value=''; return; }
          const key = `${member}:${projectId}`;
          try{
            await putVideo(db,{ key, memberId: member, projectId, name: file.name, type: file.type, size: file.size, blob: file });
            // reload slot UI
            const record = await getVideo(db,key);
            if(record && record.blob){
              const url = URL.createObjectURL(record.blob);
              const video = document.createElement('video');
              video.controls = true; video.className='video-player'; video.src = url;
              if(placeholder) placeholder.replaceWith(video);
              removeBtn.style.display='inline-block';
              removeBtn.onclick = async ()=>{ await deleteVideo(db,key); video.remove(); removeBtn.style.display='none'; if(placeholder) slot.appendChild(placeholder); };
            }
          }catch(err){ console.error(err); alert('Could not save video locally.'); }
          input.value='';
        });
      }
    }).catch(err=>{
      console.warn('member-uploader: IndexedDB unavailable',err);
    });
  }

  // auto-run for script tag specifying member
  document.addEventListener('DOMContentLoaded', ()=>{
    const script = document.querySelector('script[data-member]');
    if(script){ initForMember(script.dataset.member); }
  });
})();
