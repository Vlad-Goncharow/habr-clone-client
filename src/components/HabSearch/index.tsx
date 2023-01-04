import React from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import axios from '../../axios'
import { HabType } from '../../Types/HabType'
import s from './HabSearch.module.scss'

interface HabSearchProps {
  category:String
  habs:HabType[] | []
  setHabs: any
}

const HabSearch: React.FC<HabSearchProps> = ({ category, habs, setHabs }) => {
  // ======== input ref
  const inputRef = React.useRef<any>(null)
  // ======== input ref

  // ======== open menu ref
  const menuRef = React.useRef<any>(null)
  // ======== open menu ref

  // ========  check menu is open
  const [menuIsOpen,setMenuIsOpen] = React.useState<Boolean>(false)
  // ========  check menu is open

  // ========  habs array
  const [habsArray, setHabsArray] = React.useState<HabType[] | null>(null)
  // ========  habs array

  // ======== input
  const [habValue, setHabValue] = React.useState('')
  
  useOnClickOutside(menuRef, () => setMenuIsOpen(false))
  // ======== habs input value

  // ======== load habs by category
  const getAllHabs = async () => {
    const { data } = await axios.get(`/habs/${category}`)
    setHabsArray(data)
  }
  
  React.useEffect(() => {
    getAllHabs()
  }, [category])
  // ======== load habs by category
  
  // ======== fined hab
  let findHab:HabType[] | null = React.useMemo(() => {
    if (habsArray) {
      if (habValue) {
        const arr = [...habsArray].filter((hab) =>
          hab.title.toLowerCase().includes(habValue.toLowerCase()),
        );

        return arr.filter(({ _id: id1 }) => !habs.some(({ _id: id2 }) => id2 === id1));
      } 

      if(habs.length > 0) {
        return habsArray.filter(({ _id: id1 }) => !habs.some(({ _id: id2 }) => id2 === id1));
      }

      return habsArray
    } else {
      return null
    }
  }, [habValue, habsArray,habs])
  // ======== fined hab

  // ======== focus input open menu
  const focusInput = async () => {
    inputRef.current.focus()

    if (category) {
      setMenuIsOpen(true)
      const { data } = await axios.get(`/habs/${category}`)
      setHabsArray(data)
    }
  }
  // ======== focus input open menu

  // ======== add hab
  const addHab = (hab:HabType) => {
    setHabs((prev: any) => [...prev,hab])
  }
  // ======== add hab

  // ======== remove hab
  const removeHab = (hab: HabType) => {
    setHabs((prev: any) => prev.filter((el:HabType) => el._id !== hab._id))
  }
  // ======== remove hab

  return (
    <div ref={menuRef} className={s.item}>
      <div className={s.item__name}>Категория публикации</div>
      <div className={s.input}>
        <div className={s.input__habs}>
          {
            habs.length > 0 &&
            habs.map((hab: HabType) =>
              <div onClick={() => removeHab(hab)} key={`${hab._id}`} className={s.input__hab}>
                <span>{hab.title}</span>
                <div className={s.input__delete}></div>
              </div>
            )
          }
        </div>
        <input
          ref={inputRef}
          type="text"
          placeholder='Введите Хабы через пробел'
          value={habValue}
          onChange={(e) => setHabValue(e.target.value)}
          onClick={focusInput}
        />
      </div>
      {
        menuIsOpen &&
        <ul  className={s.habs}>
          {
            findHab !== null &&
            findHab.map((el:HabType) => 
              <li key={`${el._id}`} onClick={() => addHab(el)}>
                {el.title}
              </li>
            )
          }
        </ul>
      }
    </div>
  )
}

export default HabSearch