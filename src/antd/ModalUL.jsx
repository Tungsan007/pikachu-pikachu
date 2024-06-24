import { useState } from 'react';
import { Button, Modal } from 'antd';


const ModalUI = () => {
  
  const [modal2Open, setModal2Open] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);

  function handlePlay() {
    setModal2Open(false)
    setConfirmLoading(true)
  }
  function handleClose() {
    setConfirmLoading(false)
  }
  return (
    <>
      <Modal
        centered
        open={modal2Open}
        className='modal'
        width={230}
        classNames='custom-mask'
        confirmLoading={confirmLoading}
        afterClose={handleClose}
        closable={false}
        footer={[
          <Button key="play" type="primary" onClick={handlePlay} block={true}>
            Chơi ngay
          </Button>,
        ]}
      >
        <img width={180} height={160} src="../../assets/img/hero.jpg" alt="" />
        
      </Modal>
    </>
  );
};
export default ModalUI;