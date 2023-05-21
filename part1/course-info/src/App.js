const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            }, {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }

    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

const Header = (props) => (
    <h1>{props.course}</h1>
)

const Content = (props) => (
    <>
        {props.parts.map(part => <Part part={part} />)}
    </>
)

const Total = (props) => (
    <p>Number of exercises = {
        props.parts.reduce(
            (sum, part) => sum + part.exercises, 0
        )
    }</p>
)

const Part = (props) => (
    <p>{props.part.name} {props.part.exercises}</p>
)

export default App