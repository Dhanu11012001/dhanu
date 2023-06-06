<h2 align="center"><br>ChatGPT, by EasyCode<br></h2>
<p align="center">Experience ChatGPT with codebase integration in your IDE</p>

<p align="center">
    <a href="https://discord.gg/VgE3tQuKrg" target=”_blank”><b>Discord</b></a> |
    <a href="#getting-started">Getting Started</a> |
    <a href="#faqs">FAQs</a>
</p>

- **Free & easy setup,** no OpenAI key required.
- Generations are **relevant to your codebase**.
- Support for **GPT-4** (requires credits) and **GPT-3.5**.
- Ask **Follow up questions**.
- See a history of your past conversations (stored locally).
- **Security**, data not stored, or used for training.
- [Experimental] **in-line autocompletions** (may be removed at anytime).

### Supported Languages
- Works natively: `Javascript`, `Typescript`, `Python`
- Also supported, but requires Language Extension Pack installed <b style="color:red">before indexing</b>:
`Java` `Ruby` `Go` `PHP` `C#` `C` `C++` (see [FAQs](#faqs) for details).

### ChatGPT + ability to answer questions specific to your project.
<img src="https://github.com/chuangli94/easycode_assets/blob/main/demo_final.gif?raw=true" width="100%">

### Code Suggestion

![Code Suggestion](https://github.com/chuangli94/easycode_assets/blob/main/code_suggestion_annotated.jpg?raw=true)

### Code Explanation

![Code Explanation](https://github.com/chuangli94/easycode_assets/blob/main/code_explanation_annotated.jpg?raw=true)

### Semantic Search

![Semantic Search](https://github.com/chuangli94/easycode_assets/blob/main/semantic_search_annotated.jpg?raw=true)

### General Search

![General Search](https://github.com/chuangli94/easycode_assets/blob/main/general_search_annotated.jpg?raw=true)

## Getting Started

0. Make sure you can already use the `Find All References` feature in vs code. If you are using Java, Ruby, Go, PHP, C#, C or C++, make sure to have the appropriate language extenion pack installed before proceeeding.

<img src="https://github.com/chuangli94/easycode_assets/blob/main/find_all_references.png?raw=true" width="50%">


1. **`Index codebase`** (optional) → Upon installation, you will see the option to “Index codebase”, this is an important step that helps AI provide answers that are **relevant** to your specific situation. This is required to use **`Ask Codebase`** feature. ⚠️ **Make sure to index a folder that contains most of the logic.**

    ![Index](https://github.com/chuangli94/easycode_assets/blob/main/index_codebase.gif?raw=true)

2. **`Ask Codebase`** → ask a question that is related to your specific codebase, such as “How does this application work?"
3. **`Ask Internet`** → ask a questions such as “how to send http request in react native?”

## How to use ChatGPT

### **Understanding the Big Picture**

<img src="https://github.com/chuangli94/easycode_assets/blob/main/main_panel.png?raw=true" width="50%">

- **`Ask Codebase` →** For understanding how things work at a high level that are specific to your codebase. For example:
    - “What does this application do?”
    - “How does the user registration work?”

    Can also be used for finding relevant code:

    - “Where is user authentication handled?”

    And of course code generation:

    - “What are the changes needed to do (insert feature) ?”
    - “How do I implement (inser idea)?”
- **`Ask Internet` →** Think of this as chatGPT in your IDE. Good for understanding concepts that are general, not related to your codebase. For example:
    - “How to sort an array in python?”
    - “How to handle exceptions in python?”

### **Understandings the Specifics**

<img src="https://github.com/chuangli94/easycode_assets/blob/main/context_menu.png?raw=true" width="50%">

- **`Ask GPT` →** For open ended questions that are specific to the code you selected. Useful for questions that have a narrower scope.

- **`Ask GPT: What does this do?` →** Explains in detail what the code is doing. Useful for code that’s hard to read for various reasons (unfamiliar language, next level regex, yaml/config files, etc).

- **`Ask GPT: How is this method used?` →** Explains the usages of the method, ie how the method affects or is affected by other parts of codebase.

- **`Ask GPT: How is this file used?` →** Similar to “How is this method used”, but for a file or class.

- **`Ask GPT: Write Code` →** Get code suggestion that are specific to the code you selected. For example
    - “Modify a function so that it does ____”
    - “Write a test case that tests _____”
    - “Write documentation for this function”

- **`GPT: Explain Stack Trace` →** Analyze stack trace errors to figure out the cause

**`GPT: Index Codebase` →** Allows for re-indexing of codebase, or indexing a different part of the codebase.

## FAQs

<details>
<summary>What languages are supported?</summary>

`Ask Internet` and the Context Menu features work for most common languages.

`Ask Codebase` works natively for: `Javascript`, `Typescript`, `Python`. Also supported, but requires Language Extension Pack installed <b style="color:red">before indexing</b>:
`Java` `Ruby` `Go` `PHP` `C#` `C` `C++`

Potential language extension options:
- [Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack)
- [Ruby](https://marketplace.visualstudio.com/items?itemName=rebornix.Ruby)
- [Go](https://marketplace.visualstudio.com/items?itemName=golang.Go)
- [PHP](https://marketplace.visualstudio.com/items?itemName=xdebug.php-pack)
- [C#](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp)
- [C++](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools)
- [C](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools)

</details>

<details>
<summary>Indexing codebase is not working?</summary>

First check if your language is supported (see above).

If it requires language extension back, please have the extension installed **before indexing the codebase**. See above for a list of potential options.

After installing the language extension pack, make sure that you can use the `Find All References` feature in vs code.

<img src="https://github.com/chuangli94/easycode_assets/blob/main/find_all_references.png?raw=true" width="50%">

Re-index the codebase.

Still not working? Let us know on <a href="https://discord.gg/VgE3tQuKrg" target=”_blank”><b>Discord</b></a>.

</details>

<details>
<summary>Is ChatGPT - EasyCode free to use?</summary>

EasyCode is free to use during alpha. We may introduce paid plans in the future, but there will also be a free version.
</details>

<details>
<summary>Do I have to index my code base?</summary>

No. Indexing is required to use the **`Ask Codebase`** feature which provides answers relevant to your codebase. If you don’t want to index your codebase, you can still use all the other features.
</details>

<details>
<summary>What happens to my data?</summary>

We never store your code. Your data is **not being used** for training other AI models.

We use OpenAI to process the data. Your data does leave the machine. It is retained for 30 days by OpenAI for abuse & misuse monitoring, after which it is automatically deleted.

See OpenAI’s [Privacy Policy](https://openai.com/privacy/).
</details>

## Contact

Join our <a href="https://discord.gg/VgE3tQuKrg" target=”_blank”><b>Discord</b></a> server. Or email **[paul@personabo.com](mailto:paul@personabo.com)** with your feedback & questions!

# Additional Information About ChatGPT

### What is ChatGPT?

According to OpenAI,

> ChatGPT is a sibling model to [InstructGPT](https://openai.com/blog/instruction-following/), which is trained to follow an instruction in a prompt and provide a detailed response. ChatGPT was initially launched to get users’ feedback and learn about its strengths and weaknesses. During the research preview, usage of ChatGPT is free. A paid version of ChatGPT has since been launched with has more features.
>

According to ChatGPT itself,

> ChatGPT is an AI program designed to understand and respond to human language in a natural way. ChatGPT has been trained on a vast amount of text data, allowing it to generate human-like responses to a wide variety of questions and prompts. ChatGPT’s purpose is to assist and provide information to users in a conversational manner.
>

### How developers can use ChatGPT?

There are several ways a software developer can use ChatGPT to be more productive. Here are some potential use cases:

1. Code-related queries: ChatGPT can help answer questions related to coding and programming languages. A developer can ask questions about syntax, debugging, and other issues they might encounter while writing code.
2. Documentation assistance: Developers often need to refer to documentation to understand how to use certain libraries or frameworks. ChatGPT can help locate relevant documentation and provide guidance on how to use it effectively.
3. Collaboration support: Developers often need to collaborate with other team members on projects. ChatGPT can assist with scheduling meetings, managing tasks, and coordinating workflow.
4. Code generation: ChatGPT can generate code snippets based on prompts and examples provided by the developer. This can save time when writing repetitive code or working with complex algorithms.
5. Technical support: Developers can use ChatGPT to seek technical support on issues they encounter while working on projects. ChatGPT can provide troubleshooting guidance and suggest solutions to common problems.
6. Code optimization: ChatGPT can help identify potential areas for code optimization by analyzing code and suggesting improvements. This can help improve the performance of the code and reduce errors.

Overall, ChatGPT can be a valuable tool for software developers, helping them to be more productive and efficient in their work.

### Risks and flaws of ChatGPT for dev work

While ChatGPT can be a helpful tool for software development work, there are also some potential risks and flaws to consider. Here are some examples:

1. Limited domain knowledge: ChatGPT may not have a deep understanding of specific technical domains, such as specialized programming languages or tools. This could lead to incorrect or incomplete responses to technical questions.
2. Lack of context: ChatGPT may not always have access to the full context of a software development project, such as project requirements, team dynamics, or business goals. This could result in responses generated by ChatGPT to be not fully applicable or relevant to the situation.
3. Bias and inaccuracy: ChatGPT may incorporate biases and inaccuracies from the data it was trained on, which could lead to incorrect or problematic responses. For example, if the training data is biased towards a particular programming language or framework, ChatGPT may not be able to provide balanced or unbiased recommendations.
4. Security risks: ChatGPT may not always be able to identify or mitigate security risks, such as vulnerabilities in code or network configurations. Relying too heavily on ChatGPT for security-related tasks could leave a software development project vulnerable to cyberattacks or data breaches.

In summary, while ChatGPT can be a useful tool for software development work, it is important to be aware of its limitations and to use it in conjunction with human expertise and judgement. It is important to weigh the benefits and risks of using ChatGPT in each particular situation, and to exercise caution when relying on its responses.

### In Summary

1. ChatGPT is a language model, not a programming language: While ChatGPT can help with certain aspects of software development, it is not a programming language or development environment.
2. ChatGPT is not a replacement for human expertise: While ChatGPT can provide valuable assistance, it is important to recognize that it is not a replacement for human expertise and judgement. ChatGPT may not always have access to the full context of a development project or be able to provide the most effective solutions to complex problems.
3. ChatGPT requires careful use and monitoring: As with any AI tool, it is important to use ChatGPT carefully and to monitor its responses for accuracy and appropriateness. It is also important to ensure that any sensitive data or information is not shared with ChatGPT, and to follow best practices for data security.
4. ChatGPT can be customized and trained: While ChatGPT is pre-trained on a large dataset, it can also be fine-tuned or customized for specific use cases. This could involve training ChatGPT on domain-specific data, or fine-tuning it to provide more accurate responses for specific types of queries.

Overall, ChatGPT can be a valuable tool for software developers, but it is important to use it carefully and in conjunction with other sources of expertise and judgement. By understanding its limitations and capabilities, developers can use ChatGPT effectively to improve productivity and streamline workflows.

<div align="center">
  <br />
Made with ❤️ + ☕ from 🇨🇦
  <br />
 © 2023 EasyCode AI.
</div>
