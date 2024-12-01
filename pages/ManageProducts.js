
import EditProducts from "./EditProducts";
import UploadItems from "./UploadItems";

const ManageProducts = () => {
    return ( <>
        <UploadItems/>
        <EditProducts/>
        <div style={{marginBottom:"120px"}}></div>
    </>);
}
 
export default ManageProducts;