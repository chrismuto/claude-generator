import Markdown from 'react-markdown'

function ClaudeRecipe(props) {
    return (
        <section className="suggested-recipe-container" aria-live="polite">
            <h2>Chef Claude recommends:</h2>
            <Markdown>{props.recipe}</Markdown>
        </section>
    )
}

export default ClaudeRecipe