import React, { FC } from 'react'
import { Title } from '../../../../features/titles/titleInterface'
// import TitleItem from './TitleItem'
import { useAppSelector } from '../../../../app/hooks'
import { selectTitles } from '../../../../features/titles/titleSlice'
import TitleItem from './TitleItem'

// export interface TitleListInterface {
//     titles: Array<Title>
// }


const TitleList: FC = () => {
    const titles = useAppSelector(selectTitles)

    return (<div className='dashboardInfo__listOfItems'>{
        titles.length > 0 ? titles.map((title: Title, index: number) => (
            <TitleItem title={title} key={index} />
        )) :
            (<h1 className='dashboardInfo__noSubjects-info'>No Titles</h1>)
    }</div>)
}

export default TitleList
