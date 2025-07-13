import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = (msg,type) => {
    if (type === "warn")
        toast.warn(msg, {
            bodyClassName: "bg-light text-yellow-600",
            className: "bg-white",
            progressClassName: "bg-yellow-400",
        })
    else if (type ==="success")
        toast.success(msg ,{
            bodyClassName: "text-success",
        })
    else if (type ==="error")
        toast.error(msg, {bodyClassName: "text-red"})
}

export default notify;