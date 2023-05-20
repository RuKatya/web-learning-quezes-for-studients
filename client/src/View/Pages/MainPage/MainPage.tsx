import { FC } from 'react'
import { Link } from 'react-router-dom'


const MainPage: FC = () => {

    return (
        <div>
            <h1>lorem lorem lorem</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem sed voluptatem adipisci ducimus inventore dolores, ipsum veniam perferendis qui vel tempore vitae similique nulla? Et neque consectetur soluta similique nam.
                Hic enim illo cumque delectus aliquam dicta odit! Enim amet hic vitae doloremque tempora molestias, veniam fuga laborum sunt obcaecati ex atque modi, nihil dolore eius fugit ipsa ipsum magni.</p>
            <div>
                <Link to="/html">HTML</Link>
                <Link to="/css">CSS</Link>
                <Link to="/javascript">JavaScript</Link>
            </div>
        </div>
    )
}

export default MainPage
