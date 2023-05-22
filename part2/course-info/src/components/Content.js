import Part from './Part'

const Content = ({ parts }) => {
    return (
        <div id='content'>
            {parts.map(part => <Part key={part.id} part={part} />)}
        </div>
    )
}

export default Content
