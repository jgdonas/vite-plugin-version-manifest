# Contributing to Vite Plugin Version Manifest

First off, thank you for considering contributing! Your help is greatly appreciated.

## How Can I Contribute?

### Reporting Bugs

- Ensure the bug was not already reported by searching on GitHub under [Issues](https://github.com/jgdonas/vite-plugin-version-manifest/issues).
- If you're unable to find an open issue addressing the problem, [open a new one](https://github.com/jgdonas/vite-plugin-version-manifest/issues/new). Be sure to include a **title and clear description**, as much relevant information as possible, and a **code sample** or an **executable test case** demonstrating the expected behavior that is not occurring.

### Suggesting Enhancements

- Open a new issue with the `enhancement` label.
- Clearly describe the enhancement and the motivation for it.

### Pull Requests

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## Style Guides

### Git Commit Messages

- Use the present tense ("add feature" not "added feature").
- Use the imperative mood ("move cursor to..." not "moves cursor to...").
- Limit the first line to 72 characters or less.
- Reference issues and pull requests liberally after the first line.### Conventional Commits

We follow the [Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/) for our commit messages. This helps with automated changelog generation and semantic versioning.

**Commit Message Format:**

```terminal
<type>[optional scope]: <description>
```

**Type Examples:**

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `build`: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- `ci`: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- `chore`: Other changes that don't modify src or test files
- `revert`: Reverts a previous commit

**Example:**

```terminal
feat(manifest): add verbose option to plugin configuration
```

### Code Style

- Follow the existing code style.
- Run `npm run lint` (or equivalent) to check for linting errors.
