# Change Log

All notable changes to the "ChatGPT - EasyCode" extension will be documented in this file.

## [0.8.7]

- BUG fix: Do not use version 0.8.6!

## [0.8.6]

- Improved streaming stability

## [0.8.5]

- Improved streaming bandwidth efficiency

## [0.8.4]

- Improved streaming stability

## [0.8.3]

- Extension now supports countries where openai api access is blocked

## [0.8.2]

- Security update, you must update to this version or else extension will stop working

## [0.8.1]

- Fixed a bug with textbox height not resetting when switching tabs

## [0.8.0]

- Adjusted rate limiter for in-line autocomplete

## [0.7.9]

- [EXPERIMENTAL] Added back in-line autocompletions. They are now much faster than before
- Textboxes are now fixed-height by default. Added an option to expand and collapse them

## [0.7.8]

- Fixed a bug that causes the persistent error: "An error occurred while loading view: easycode.chatView"

## [0.7.7]

- Added support for vscode light themes
- Fixed a bug where pressing enter does not work when ask codebase is selected

## [0.7.6]

- Fixed a bug where GPT-4 tokens get deduced when openai call fails
- Max tokens can now only contain a maximum of 2000 tokens
- Fixed a bug that causes 400 error when max token is set to too high
- Changed icon

## [0.7.5]

- Added an opt-in option for data collection. This is turned off by default.
- Increased padding on message tabs
- Fixed an error with messages being generated on the wrong tab
- Closing a tab will now automatically switch to the nearest tab
- Fixed a bug where nothing is generated when all tabs have been closed

## [0.7.4]

- Added a backup openai server in case the primary one fails. This will not handle all openai errors

## [0.7.3]

- Added more logging for errors

## [0.7.2]

- Added better logging for errors

## [0.7.1]

- Hotfix for bug that causes GPT-4 to not work

## [0.7.0]

- Made error messages more verbose for OpenAI errors
- AI is now aware whether it is GPT-4 or GPT-3
- Fixed a bug with the wrong tab's conversation being used during follow-up questions
- Fixed a bug where a follow-up message cannot be sent
- Fixed a warning with syntax highlighting and HTML not being escaped
- Fixed a bug with HTML code generated not rendering properly when not inside a code block

## [0.6.9]

- Added an option to provide your own OpenAI api key. Using your own key will not be rate-limited

## [0.6.8]

- Added an option to clear extension cache

## [0.6.7]

- Added GPT-3.5 Pro Plan

## [0.6.6]

- Fixed bug with code blocks not rendering colors properly
- Updated icon and description due to GPT-4 availability
- Fixed issue with password reset not being sent out
- Added a new button for copying code blocks

## [0.6.5]

- Fixed bug where GPT-4 users are still running into the rate limiter


## [0.6.4]

- Added support for chat history [stored locally]
- Code selected is now added into the input box
- Added GPT-4 credit packs
- Made chat input box more robust to whats being copied in
- Chat input box now shows selected code

## [0.6.3]

- Removed GPT-4 credits for new free users
- Changed extension name
- Removed the experimental github copilot feature

## [0.6.2]

- Adjusted GPT-4 credits for free users

## [0.6.1]

- Security update

## [0.6.0]

- Added support for multiple lines in the input box
- Added better message for codebase indexing
- Changed the upgrade button to a gold color
- Adjusted GPT-4 credits for free users

## [0.5.9]

- Added a password reset form

## [0.5.8]

- Added an announcement footer that can display announcement and update messages

## [0.5.7]

- Slightly sped up inline autocomplete
- Inline autocomplete now shows when it has failed to think of a suggestion
- Inline autocomplete now uses GPT-4 tokens
- Fixed a bug that prevented people from trying the extension without an account
- Fixed a bug that caused the app to become unresponsive and the server response to become delayed
- Adjusted rate limit and GPT-4 tokens for free users

## [0.5.6]

- Fixed discord link inside the extension

## [0.5.5]

- Fixed a bug for users who do not have accounts

## [0.5.4]

- Removed login requirement for users who do not have yet have accounts
- Fixed an issue with inline autocomplete hotkey (shift+tab) overriding default behaviour to reverse indents

## [0.5.3]

- [EXPERIMENTAL] Added copilot-styled code autocomplete. Move your cursor anywhere in the code and press Shift+Tab to trigger this!
- Added support for editing conversations midway
- Extension only shows relevant editor menu options depending on whether you have code selected or not
- Bug Fixes:
    - Fixed a bug with overlapping text due to first bug fix
    - Fixed a bug with stop generation button not working

## [0.5.2]

- Fixed a UI bug where asking a new question does not stop the generation for the previous question so it has 2 conversations overlapping
- Fixed a bug with codebase indexing check mark not working after immediate codebase indexing
- Fixed a bug with the 20 minute rate limiter for paid users

## [0.5.1]

- Improved throttling issues for GPT-4 -> We can handle about 4x more tokens now!
- Added Write Unit Tests feature
- Added Refactor Code feature
- Added a button to stop generations midway
- Changed ask codebase logic into a checkbox instead of toggle
- Changed links for codebase references from buttons into text to not conflict with stop generation button

## [0.5.0]

- Moved some logic to the server to improve robustness without requiring patching the extension
- Revamped UI
    - Added toggle to the chat between ask codebase and ask internet
    - You can now press enter to submit input
    - Added link for discord server
    - Added link for extension settings
    - Added index codebase To command pallete
    - Added link to navigate back to features page
- Added error message for openai throttling
- An account is now required
- Added a paid plan. Free plan stays the same.

## [0.4.8]

- Hotfix for OpenAI outage

## [0.4.7]

- Fixed OpenAI Bug

## [0.4.6]

- Added additional language support. Please note that you must have the language pack installed BEFORE codebase is indexed
- Added Golang support
- Added PHP support
- Added C support
- Added C++ support
- Added Ruby Support
- Updated documentation

## [0.4.5]

- Changed rate limit

## [0.4.4]

- Changed Icon

## [0.4.3]

- Removed Outdated Info From README

## [0.4.2]

- Added model settings explanation to documentation

## [0.4.1]

- Added gpt-3.5-turbo and gpt-4 [Heavily Rate Limited]
- Renaming of extension

## [0.4.0]

- Clicking code and text generated in answers will now try to reference the codebase [This is an experimental feature]
- Changed codebase indexing to also incorporate file names. Ask codebase will now take into account file names when generating answers
- Index codebase will now ignore all files found in .gitignore
- Removed outdated commands from the command pallete

## [0.3.6]

- Sped up text generation speed for long responses with code examples and chat histories

## [0.3.5]

- Fixed bug with explain file flow not explaining files

## [0.3.4]

- Added stack trace explanations
- Changed category to other
- Changed startup logic to start when VSCode Starts

## [0.3.3]

-Updated README

## [0.3.2]

- Fixed indexing codebase bug on old version of vscode on windows that do not support ES 2022 which prevented files from being processed
- Added an error message for indexing codebase when there is no current active project
- Added a check to prevent asking codebase when the prompt is empty
- Fixed a UX bug where two buttons showing "ask codebase" is displayed

## [0.3.1]

- Added visual studio styled syntax highlighting for code

## [0.3.0]

- Added support for visual studio code version 1.6.1 and up (instead of 1.6.5 and up)

## [0.2.9]

- Added user email requirement
- Added support for visual studio code version 1.6.5 and up (instead of 1.7.3 and up)

## [0.2.6]

- Changed changelog
- Changed UX so index codebase happens automatically when user presses ask codebase button

## [0.2.5]

- Changed title and description

## [0.2.4]

- Fixed a bug for tutorial view the text does not disappear

## [0.2.3]

- Added support for Lua Language [Requires Lua Extension Pack To Work Well]
- Changed category tags of extension
- Fixed UX bug for tutorial view

## [0.2.2]

- Initial Launch
