import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



const ChangeStatus = (props) => {

    const { show, dataChangeStatus } = props;



    const handleClose = () => {
        props.setShow(false);
    };


    return (
        <Dialog
            open={show}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            {dataChangeStatus ?
                (dataChangeStatus.status === 10 ?
                    <>
                        <DialogTitle id="alert-dialog-title">
                            {`Do you want accept booking ${dataChangeStatus.booking_id} ?`}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {/* Thêm mô tả nếu cần */}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => props.handleSubmitChangeStatus("DENY")}>
                                Deny
                            </Button>
                            <Button onClick={() => props.handleSubmitChangeStatus("ACCEPT")} autoFocus>
                                Accept
                            </Button>
                        </DialogActions>
                    </>
                    :
                    <>
                        <DialogTitle id="alert-dialog-title">
                            {`Do you want refund booking ${dataChangeStatus.booking_id}`}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {/* Thêm mô tả nếu cần */}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => props.handleSubmitChangeStatus("RETURN")} autoFocus>
                                Accept
                            </Button>
                        </DialogActions>
                    </>
                )
                :
                null // Nếu dataChangeStatus không tồn tại, không hiển thị gì cả
            }


        </Dialog>
    )

}

export default ChangeStatus;