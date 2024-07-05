# Beauty Clinic Project

Website for beauty clinic that offers hand crafted natural treatments for their clients

## Table of Contents

- [Demo](#demo)
- [Project structure](#project-structure)
- [Code conventions](#code-conventions)
- [Installation](#installation)

## Demo

Here is a working live demo: <a href="#">link</a>

![Project Image](docs/assets/home-page.png)

<p>
    <a href='#beauty-clinic-project'>Back To The Top</a>
</p>

## Project structure

<ul>
    <li>
        Project root
        <ul>
            <li>
                <code>/docs</code> - project docs folder
                <ul>
                    <li>
                        <code>/assets</code> - for screenshots of app or other related assets to docs
                    </li>
                </ul>
            </li>
            <li>
             <code>/src</code> - project source code folder
                <ul>
                    <li>
                        <code>/api</code> - for graphql server intergation
                        <ul>
                            <li>
                                <code>/generated</code> - for generated hooks, documents from server graphql schema, created using codegen
                            </li>
                            <li>
                                <code>/graphql</code> - for graphql queries to backend
                            </li>
                        </ul>
                    </li>
                    <li>
                        <code>/assets</code> - for assets ('.png', '.svg', '.jpg', 'webp', ...)
                    </li>
                    <li>
                        <code>/components</code> - for shared components
                    </li>
                    <li>
                        <code>/config</code> - for general configurations (integrations with apollo client etc)
                    </li>
                    <li>
                        <code>/constants</code> - for general constants
                    </li>
                    <li>
                        <code>/hooks</code> - for reusable hooks
                    </li>
                    <li>
                        <code>/layouts</code> - for reusable relatively large page parts (headers, footers, sidebars, navbars, containers etc)
                    </li>
                    <li>
                        <code>/pages</code> - for project pages
                    </li>
                    <li>
                        <code>/routes</code> - for <code>react-router-dom</code> routes
                    </li>
                    <li>
                        <code>/store</code> - for globally managed application state
                    </li>
                    <li>
                        <code>/theme</code> - for global styling
                    </li>
                    <li>
                        <code>/types</code> - for global types
                    </li>
                    <li>
                        <code>/utils</code> - for reusable functions
                    </li>
                    <li>
                        <code>/validations</code> - for validation schemas generally used inside forms
                    </li>
                </ul>
            </li>
            <li>
                <code>/tests</code> - project tests folder
                <ul>
                    <li>
                        <code>/coverage</code> - for test coverage
                    </li>
                    <li>
                        <code>/unit</code> - for unit tests
                    </li>
                </ul>
            </li>
        </ul>
    </li>
</ul>

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
    <li>You should use <code>vite-plugin-svgr</code> for importing <code>svg</code> format like following: <code>@assets/icons/instagram.svg</code></li>
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
