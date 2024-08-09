import React, {useState} from 'react';
import Languages from '../../Data/languages/langFunction';
import "../../ui/moduleUpload/module.css"

import { Data } from '../../Data/Context/context';

function UploadModule({present,stopUpload}) {

    const show = Data()

    const lang = Languages();

    const showMainMod = show.showModule
    const setShowMainMod = show.setShowModule
    // const [showMainMod, setShowMainMod] = useState(show.showModule);
    const [closeF, setCloseF] = useState(false);

  
    const handleClose = () => {
        setCloseF(true);
        setTimeout(() => {
            setCloseF(false);
            setShowMainMod(false);
        }, 500);
    }
    

  return (
    <div className={`ModuleUpload ${showMainMod? "show" : ""}`}>
        <div className="blackScreen"></div>
        <div className={`moduleContainer ${closeF? "closeF" : ""}`}>
            <header>
                <h3>{lang.uploadModule.title}</h3>
            </header>
            <section>
                <div className='img-container'>
                    <img draggable={false} src="/upload.png" alt="uploadIcon" />
                </div>
                <div className="details-module">
                    <div className="progress">
                        <div className="progress-bar" style={{width: present+"%"}}>{present}%</div>
                    </div>
                </div>
            </section>
            <footer>
                <button className='btn btn-secondary' onClick={handleClose}>{lang.uploadModule.btn}</button>
            </footer>
        </div>
        
    </div>
  )
}

export default UploadModule