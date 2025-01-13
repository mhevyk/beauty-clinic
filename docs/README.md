# Beauty Clinic Project

Website for beauty clinic that offers hand crafted natural treatments for their clients

## Table of Contents

- [Demo](#demo)
- [Scripts](#scripts)
- [Project structure](#project-structure)
- [Code conventions](#code-conventions)
- [Installation](#installation)
- [References](#references)

## Demo

Here is a working live demo: <a href="https://beauty-clinic-hm.vercel.app/">link</a>

![Project Image](assets/home-page.png)

<p>
    <a href='#beauty-clinic-project'>Back To The Top</a>
</p>

## Scripts

| Name                    | Description                                                                |
| ----------------------- | -------------------------------------------------------------------------- |
| `npm run start`         | Start the project in development mode                                      |
| `npm run start:prod`    | Start the project in development mode with production envs                 |
| `npm run build`         | Build the project for production                                           |
| `npm run build:dev`     | Build the project with development envs                                    |
| `npm run build:analyze` | Build and visualize chunks of vite bundle                                  |
| `npm run preview`       | Start already built project with build-like command                        |
| `npm run codegen`       | Run graphql codegen                                                        |
| `npm run pretest`       | Helper script to ensure all required modules exists by the time of testing |
| `npm run test`          | Run unit tests                                                             |
| `npm run test:coverage` | Run unit tests with collecting coverage                                    |
| `npm run test:mutation` | Run mutation tests                                                         |
| `npm run test:e2e:open` | Run e2e tests with opening separate cypress application                    |
| `npm run test:e2e:run`  | Run e2e tests to run just in terminal                                      |
| `npm run lint:check`    | Check for linter errors                                                    |
| `npm run lint:fix`      | Fix linter errors                                                          |
| `npm run format:check`  | Check for formatting issues                                                |
| `npm run format:fix`    | Reformat all files with formatting issues                                  |
| `npm run prepare`       | Helper script for husky. Try not to use it directly                        |
| `npm run pre-commit`    | Helper script for husky. Try not to use it directly                        |

## Project structure

<details open>
    <summary>Project Root</summary>
    <ul>
        <li>
            <details>
                <summary><code>/.github</code> - GitHub-specific configuration</summary>
                <ul>
                    <li>
                        <details>
                            <summary><code>/workflows</code> - CI/CD actions</summary>
                            <ul>
                                <li><code>preview.yml</code> - "preview" actions flow</li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </details>
        </li>
        <li>
            <details>
                <summary><code>/.husky</code> - Husky configuration (GitHub hooks)</summary>
            </details>
        </li>
        <li>
            <details>
                <summary><code>/.vscode</code> - Optional folder for local VSCode editor configuration</summary>
            </details>
        </li>
        <li>
            <details>
                <summary><code>/dist</code> - Folder for production build</summary>
            </details>
        </li>
        <li>
            <details>
                <summary><code>/docs</code> - Project documentation folder</summary>
                <ul>
                    <li>
                        <details>
                            <summary><code>/assets</code> - Screenshots and related assets for docs</summary>
                        </details>
                    </li>
                </ul>
            </details>
        </li>
        <li>
            <details>
                <summary><code>/node_modules</code> - External packages, created after <code>npm install</code></summary>
            </details>
        </li>
        <li>
            <details open>
                <summary><code>/src</code> - Project source code folder</summary>
                <ul>
                    <li>
                        <details>
                            <summary><code>/api</code> - GraphQL server integration</summary>
                            <ul>
                                <li>
                                    <details>
                                        <summary><code>/generated</code> - Generated hooks and documents from GraphQL schema</summary>
                                    </details>
                                </li>
                                <li>
                                    <details>
                                        <summary><code>/graphql</code> - GraphQL queries to backend</summary>
                                    </details>
                                </li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <details>
                            <summary><code>/assets</code> - Assets (e.g., '.png', '.svg', '.jpg', '.webp')</summary>
                        </details>
                    </li>
                    <li>
                        <details>
                            <summary><code>/components</code> - Shared components</summary>
                        </details>
                    </li>
                    <li>
                        <details>
                            <summary><code>/config</code> - General configurations (e.g., Apollo client)</summary>
                        </details>
                    </li>
                    <li>
                        <details>
                            <summary><code>/constants</code> - General constants</summary>
                        </details>
                    </li>
                    <li>
                        <details>
                            <summary><code>/containers</code> - Larger components excluding layouts</summary>
                        </details>
                    </li>
                    <li>
                        <details>
                            <summary><code>/hooks</code> - Reusable hooks</summary>
                        </details>
                    </li>
                    <li>
                        <details>
                            <summary><code>/layouts</code> - Reusable large page parts (e.g., headers, footers)</summary>
                        </details>
                    </li>
                    <li>
                        <details>
                            <summary><code>/pages</code> - Project pages</summary>
                        </details>
                    </li>
                    <li>
                        <details>
                            <summary><code>/routes</code> - <code>react-router-dom</code> routes</summary>
                        </details>
                    </li>
                    <li>
                        <details>
                            <summary><code>/store</code> - Globally managed application state</summary>
                        </details>
                    </li>
                    <li>
                        <details>
                            <summary><code>/theme</code> - Global styling</summary>
                        </details>
                    </li>
                    <li>
                        <details>
                            <summary><code>/types</code> - Global types</summary>
                        </details>
                    </li>
                    <li>
                        <details>
                            <summary><code>/utils</code> - Reusable functions</summary>
                        </details>
                    </li>
                    <li>
                        <details>
                            <summary><code>/validations</code> - Validation schemas for forms</summary>
                        </details>
                    </li>
                </ul>
            </details>
        </li>
        <li>
            <details>
                <summary><code>/tests</code> - Project tests folder</summary>
                <ul>
                    <li>
                        <details>
                            <summary><code>/e2e</code> - Integration (e2e) tests</summary>
                            <ul>
                                <li>
                                    <details>
                                        <summary><code>/features</code> - Feature files (user stories)</summary>
                                    </details>
                                </li>
                                <li>
                                    <details>
                                        <summary><code>/fixtures</code> - E2e testing constants</summary>
                                    </details>
                                </li>
                                <li>
                                    <details>
                                        <summary><code>/plugins</code> - Plugins</summary>
                                    </details>
                                </li>
                                <li>
                                    <details>
                                        <summary><code>/support</code> - Main integration tests folder</summary>
                                        <ul>
                                            <li>
                                                <details>
                                                    <summary><code>/step-definitions</code> - Implementations for feature files</summary>
                                                </details>
                                            </li>
                                            <li>
                                                <details>
                                                    <summary><code>commands.ts</code> - Custom e2e commands</summary>
                                                </details>
                                            </li>
                                            <li>
                                                <details>
                                                    <summary><code>index.ts</code> - Main file searched by Cypress package</summary>
                                                </details>
                                            </li>
                                        </ul>
                                    </details>
                                </li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <details>
                            <summary><code>/mutation</code> - Mutation tests</summary>
                            <ul>
                                <li>
                                    <details>
                                        <summary><code>/reports</code> - Mutation test reports</summary>
                                    </details>
                                </li>
                                <li>
                                    <details>
                                        <summary><code>stryker-incremental.json</code> - Incremental file</summary>
                                    </details>
                                </li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <details>
                            <summary><code>/unit</code> - Unit tests</summary>
                            <ul>
                                <li>
                                    <details>
                                        <summary><code>/coverage</code> - Unit test coverage</summary>
                                    </details>
                                </li>
                                <li>
                                    <details>
                                        <summary><code>/mocks</code> - Reusable mock data</summary>
                                    </details>
                                </li>
                                <li>
                                    <details>
                                        <summary><code>/src</code> - Tests reflecting global src folder structure</summary>
                                    </details>
                                </li>
                                <li>
                                    <details>
                                        <summary><code>/utils</code> - Test utilities</summary>
                                    </details>
                                </li>
                                <li>
                                    <details>
                                        <summary><code>setupTests.ts</code> - Global test setup</summary>
                                    </details>
                                </li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </details>
        </li>
    </ul>
</details>

<p>
    <a href='#beauty-clinic-project'>Back To The Top</a>
</p>

## Code conventions

#### General

<ul>
    <li>Use default exports for functions, components, hooks etc</li>
    <li>Avoid using <code>useEffect</code> hook and use it the last resort</li>
    <li>Prefer using <code>flex</code> or <code>grid</code> over <code>absolute</code> of <code>fixed</code> position</li>
    <li>Optimal code lines count in file is up to 100, approximate max code lines in file is 200. If this rule is broken, refactoring is needed (creating another component, splitting logic in custom hook etc)</li>
    <li>All related business logic should be moved in custom hook if there is 3 or more related parts</li>
    <li>Handler names should follow the pattern <code>handleSomeAction</code>, for example <code>handleButtonClick</code></li>
    <li>Handlers should be moved above return statement to make our jsx as clean as possible</li>
    <li>All methods in reusable hooks should be wrapped inside <code>useCallback</code></li>
    <li>All application-level constants should be in uppercase</li>
    <li>All pages should be lazy loaded using <code>React.lazy</code></li>
</ul>

#### Images

<ul>
    <li>You should use <code>vite-plugin-svgr</code> for importing <code>svg</code> as <code>&lt;svg&gt;</code> dom element like following: <code>@assets/icons/instagram.svg</code></li>
    <li>You should use <code>vite-plugin-svgr</code> for importing <code>svg</code> as <code>&lt;img&gt;</code> source like following: <code>@assets/icons/instagram.svg?url</code></li>
    <li>
        Svgs, imported by <code>vite-plugin-svgr</code> should be in pascal pase using pattern <code>IconNameIconSvg</code>, for example importing facebook icon should look like following: <code>import FacebookIconSvg from "@assets/icons/facebook.svg"</code>    
    </li>
</ul>

#### Styles

<ul>
    <li>You should use only default imports from mui (because it is more performant)</li>
    <li>You should use styled components for styling</li>
</ul>

#### Typescript

<ul>
    <li>You should use <code>type</code> keyword to declare types instead of <code>interface</code> in all places except extending external packages</li>
    <li>Types should be in pascal pase (start from capital letter)</li>
    <li>Props for component should be in the same file just above component declaration</li>
    <li>Props for component should be named using pattern <code>ComponentNameProps</code>, for example props for component <code>Footer</code> should have name <code>FooterProps</code></li>
</ul>

<p>
    <a href='#beauty-clinic-project'>Back To The Top</a>
</p>

## Installation

1. Clone the repo

```sh
git clone https://github.com/mhevyk/beauty-clinic.git
```

2. Install NPM packages

```sh
npm install
```

3. Add <code>.env</code> files to the root of the project
4. Run project

```sh
npm run dev
```

<p>
    <a href='#beauty-clinic-project'>Back To The Top</a>
</p>

## References

- [Figma](https://www.figma.com/design/LP3lkH1appZ5IEpCIzpiBB/Untitled?node-id=0-1&p=f&t=rkHRRrbJ6TgXpVG7-0)
- [Diagrams](https://app.diagrams.net/#G1cZqnK6xVhwIReldDNYB6Gxj1dWOK4Sue#%7B%22pageId%22%3A%22_8Qr5bBKNUSIrBjIGSZs%22%7D)
- [Database schema](https://dbdiagram.io/d/Beauty-clinic-66e549bf6dde7f414917a6e0)
