import Anthropic from "@anthropic-ai/sdk/index.mjs"

const SYSTEM_PROMPT= `You are an assistant that recieves a list of ingredients that a user has and suggests a recipe they could make with some
or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't
mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a webpage.`

// const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

const anthropic = new Anthropic ({
    // apiKey: apiKey,
    dangerouslyAllowBrowser: true,
});

async function getRecipeFromClaudeChef(ingredientsArray) {
    const ingredientsString = ingredientsArray.join("");

    try {const message = await anthropic.messages.create({
        model: "claude-3-haiku-20240307",
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: [
            {role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make.`},
        ]
    });
        return message.content[0].text;
    } catch (err) {
        console.error(err.message)
    }
}

export default getRecipeFromClaudeChef;