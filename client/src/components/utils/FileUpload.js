import React,{useState} from 'react'
import Dropzone from 'react-dropzone'
import {Icon} from 'antd';
import axios from 'axios'

function FileUpload(props) {
    const [Images,setImages] = useState([])
    const dropHandler =(files) => {
        let formData = new FormData();

        const config ={
            header:{'content-type':'multipart/fomr-data'} //어떤파일인지 타입을 정의해 백엔드에서 오류 안나게 함
        }
        formData.append("file",files[0])//올리는 파일 정보가 들어감
        axios.post('/api/product/image',formData,config)
            .then(response => {
                if(response.data.success){
                    //console.log(response.data)
                    //이미지를 올렸을 때
                    setImages([...Images,response.data.filePath])
                    props.refreshFunction([...Images,response.data.filePath])
                }else{
                    alert('파일을 저장하는데 실패했습니다.')
                }
            })
    
    }
    //이미지를 지웠을 때
    const deleteHandler = (image)=>{
        const currentIndex = Images.indexOf(image)
        //console.log(currentIndex)
        let newImages = [...Images]
        newImages.splice(currentIndex,1)
        setImages(newImages)
    }
    return (    
        <div style={{display:'flex', justifyContent:'space-between'}}>
            <Dropzone onDrop={dropHandler}>
                {({getRootProps, getInputProps}) => (
                 <div 
                    style={{width:300,height:240,border:'1px solid lightgray',
                    display:'flex',alignItems:'center',justifyContent:'center'
                }} 
                    {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Icon type="plus" srtle={{fontSize:'3rem'}}/>
                </div>    
                )}
            </Dropzone>

            <div style={{display:'flex',width:'350px',height:'240px',overflowX:'scroll'}}>
                {Images.map((image,index)=>(
                    <div onClick={()=> deleteHandler(image)} key={index}>
                        <img style={{minWidth:'300px',width:'300px',height:'240px'}}
                            src={`http://localhost:5000/${image}`}
                       />
                   </div>
                ))}

            </div>
        </div>
    )
}

export default FileUpload
