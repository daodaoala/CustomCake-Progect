import React, { useState } from 'react';
import { Typography, Form, Input } from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

//디자인 종류
const Continent = [
    {
        key: 1,
        value: "디자인1"
    },
    {
        key: 2,
        value: "디자인2"
    },
    {
        key: 3,
        value: "디자인3"
    },
    {
        key: 4,
        value: "디자인4"
    },
    {
        key: 5,
        value: "디자인5"
    },
    {
        key: 6,
        value: "디자인6"
    },
    {
        key: 7,
        value: "디자인7"
    }
]


function UploadProductPage(props) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [continent, setContinent] = useState(1);
    const [images, setImages] = useState([]);

    const nameChangeHandler = e => {
        const { value } = e.target;
        setName(value);
    }

    const descriptionChangeHandler = e => {
        const { value } = e.target;
        setDescription(value);
    }

    const priceChangeHandler = e => {
        const { value } = e.target;
        setPrice(value);
    }

    const continentChangeHandler = e => {
        const { value } = e.target;
        setContinent( value );
    }

    const updateImages = (newPath) => {
        setImages(newPath);
    }

    const submitHandler = (e) => {
        e.preventDefault();

        if( !name || !description || !price || !continent || !images) {
            return alert("모든 값을 입력해주세요.");
        }

        // 서버에 채운 값들을 request로 보낸다.
        const body = {
            writer: props.user.userData._id,
            title: name,
            description: description,
            price: price,
            continent:continent,
            images: images
        }
        
        Axios.post("/api/product", body)
            .then(response => {
                if( response.data.success) {
                    alert("상품 업로드에 성공해부럿");
                    props.history.push('/');
                } else {
                    alert("상품 업로드에 실패!");
                }
            })
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}>커스텀 케이크 상품 업로드</Title>
            </div>

            <Form onSubmit={submitHandler}>
                {/* DropZone */}
                <FileUpload
                    refreshFunction={updateImages}
                />


                <br />
                <br />
                <label>이름</label>
                <Input
                    onChange={nameChangeHandler}
                    value={name}
                    placeholder="케이크명을 입력해주세요"
                />
                <br />
                <br />
                <label>설명</label>
                <TextArea
                    onChange={descriptionChangeHandler}
                    value={description}
                    placeholder="케이크 설명을 입력해주세요"
                />
                <br />
                <br />
                <label>가격($)</label>
                <Input
                    type="number"
                    onChange={priceChangeHandler}
                    value={price}
                />
                <br />
                <br />
                <select
                    onChange={continentChangeHandler}
                    value={continent}
                >
                    {Continent.map(continent => (
                        <option
                            key={continent.key}
                            value={continent.key}
                        >
                            {continent.value}
                        </option>
                    ))}
                </select>
                <br />
                <br />
                <button type="submit">
                    확인
                </button>
            </Form>
        </div>
    )
}

export default UploadProductPage