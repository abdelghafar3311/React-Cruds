import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = (msg,type) => {
    if (type === "warn")
        toast.warn(msg, {
            bodyClassName: "bg-light text-warning",
            className: "bg-light",
            progressClassName: "bg-warning",
        })
    else if (type ==="success")
        toast.success(msg ,{
            bodyClassName: "text-success",
        })
    else if (type ==="error")
        toast.error(msg, {bodyClassName: "text-danger"})
}

export default notify;