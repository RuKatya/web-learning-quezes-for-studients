import React, { FC } from 'react'
import { useAppDispatch } from '../../../../app/hooks'
import { removeTitle, updateTitle } from '../../../../features/titles/titleApi'
import { Title } from '../../../../features/titles/titleInterface'
import ListItem from '../../../UI/ListItem'

interface TitleItemProps {
    title: Title
}

const TitleItem: FC<TitleItemProps> = ({ title }) => {
    const dispatch = useAppDispatch()

    const hendleDeleteTitle = (Title_QuizID: number, title: string) => {
        const approveUserToDelete = window.confirm("Are you sure you want to delete the title?")

        if (approveUserToDelete) {
            const makeSureToDelete = prompt(`To delete the subject, please write ${title}`)

            if (title === makeSureToDelete) {
                dispatch(removeTitle(Title_QuizID))
            } else {
                alert("Wrong Value")
            }
        }
    }

    const hendleUpdateTitleFunc = (ev: React.SyntheticEvent) => {
        ev.preventDefault()

        const target = ev.target as typeof ev.target & {
            titleName: { value: string, id: string }
        }

        const TitleName = target.titleName.value
        const id = Number(target.titleName.id)

        if (TitleName.length <= 2) {
            return alert("The Input must be atleast 3 charasters")
        }

        dispatch(updateTitle({ id, TitleName }))
    }

    return (
        <ListItem
            itemID={title.Title_QuizID}
            itemName={title.Title}
            itemCategory={"title"}
            deleteFunc={hendleDeleteTitle}
            updateFunc={hendleUpdateTitleFunc}
            draft={title.Draft}
        />
    )
}

export default TitleItem
