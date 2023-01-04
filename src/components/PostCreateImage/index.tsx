import React from 'react'
import s from './PostCreateImage.module.scss'

interface PostCreateImageProps {
  setImage:(arg:any) => void
  image:any
}

const PostCreateImage: React.FC<PostCreateImageProps> = ({ setImage, image }) => {
  // ======== showed image url
  const [url,setUrl] = React.useState('')
  // ======== showed image url
  
  // ======== onChangeFile
  const onChangeFile = (e: any) => {
    var fr: any = new FileReader();
    fr.onload = function () {
      setUrl(fr.result)
    };
    fr.readAsDataURL(e.target.files[0]);
    setImage(e.target.files[0]);
  };
  // ======== onChangeFile

  // ======== clearImg
  const clearImg = () => {
    setImage('')
    setUrl('')
  }
  // ======== clearImg

  return (
    <div className={s.image}>
      <input name='image' id='image' onChange={onChangeFile} type="file" />
      {
        image
          ?
          <div className={s.image__preview}>
            <img src={url} alt="" />

            <button onClick={clearImg} className={s.image__setting}>Удалить</button>
          </div>
          :
          <div className={s.image__upload}>
            <div className={s.image__info}>
              <span>Добавьте обложку</span>
              <span>Перенесите сюда файл (jpg, gif, png) размером 780×440 или нажмите</span>
              <button>Загрузить обложку</button>
            </div>
          </div>
      }
    </div>
  )
}

export default PostCreateImage