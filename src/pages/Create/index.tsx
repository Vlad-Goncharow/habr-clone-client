import PostCreateEditor from '../../components/PostCreateEditor'

import s from "./Create.module.scss"

function Create() {
  return (
    <div className={s.page}>
      <div className="container">
        <PostCreateEditor />
      </div>
    </div>
  )
}

export default Create