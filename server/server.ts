import express from "express";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

if (!process.env.OPENAI_API_KEY) {
	console.error("Missing env var OPENAI_API_KEY. Exiting");
	process.exit(1);
}

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
const port = process.env.PORT || 3001;

const cache = new Map<string, string>();

app.get("/", (_req, res) => {
	res.status(200);
	res.send("ok");
	return
});

app.get("/command", async (req, res) => {
	const transformation = req.query.transformation;

	if (transformation) {
		const result = cache.get(transformation?.toString());
		if (result) {
			console.log('Cache hit for: ', transformation);
			res.send({ command: "convert " + result });
			return
		}
	} else {
		res.status(500);
		res.json({ error: 'Missing transformation' });
		return
	}

	if (transformation.toString().length > 500) {
		res.status(500);
		res.json({ error: 'Transformation is too long' });
		return
	}

	try {
		const response = await openai.createCompletion({
			model: "text-davinci-003",
			prompt: "Convert this text to an ImageMagick cli command:\n\nExample: Reduce the size of the image\nOutput: convert input.png -resize 50% output.png\n\nInput: " + transformation + "\nOutput: convert",
			temperature: 0,
			max_tokens: 100,
			top_p: 1,
			frequency_penalty: 0.2,
			presence_penalty: 0,
		});

		/*
		const response = await openai.createCompletion({
			model: "code-davinci-002",
			prompt: `# ImageMagick convert command that ${transformation}\n# Input file is input.png, output file is output.png\nconvert`,
			temperature: 0,
			max_tokens: 256,
			top_p: 1,
			frequency_penalty: 0,
			presence_penalty: 0,
			stop: ["\n"],
		});
		*/
		console.log(response);

		const result = response.data.choices[0].text?.replace("```", "");
		if (result) {
			cache.set(transformation.toString(), result);
		}
		res.send({ command: "convert " + result });
	} catch (err) {
		console.log(err);
		res.status(500);
		res.json({ error: "Sorry, something went wrong. Please try again later" });
	}
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
