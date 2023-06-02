import Modal from "react-modal";

export default function CompleteModal(){
  const customStyles = {
    content: {
      top: "40%",
      left: "30%",
      right: "auto",
      bottom: "auto",
      width: "fit-content",
      height: "fit-content",
      minWidth: "30%",
      transform: "translate(-50%, -50%)",
      marginX: "auto",
      borderRadius: "3rem",
      // border: "2px solid #ff4114",
      color: "#474239",
      backgroundColor:  "#99c7c2",
      padding: "3rem 4rem",
      // boxShadow: "0px 0px 10px 10px #cae3e0"
    },
    overlay: {
      backgroundColor: "#FBF4E6aa",
    },
  };

  return (
    <Modal
      isOpen={isModalOpen}
      contentLabel="Modal"
      ariaHideApp={false}
      closeTimeoutMS={1000}
      shouldCloseOnOverlayClick={false}
      style={customStyles}>
    </Modal>
  )
}