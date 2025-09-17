# theme dev


  Uploads the current theme as the specified theme, or a [development theme](https://shopify.dev/docs/themes/tools/cli#development-themes), to a store so you can preview it.

This command returns the following information:

- A link to your development theme at http://127.0.0.1:9292. This URL can hot reload local changes to CSS and sections, or refresh the entire page when a file changes, enabling you to preview changes in real time using the store's data.

  You can specify a different network interface and port using `--host` and `--port`.

- A link to the [editor](https://shopify.dev/docs/themes/tools/online-editor) for the theme in the Shopify admin.

- A [preview link](https://help.shopify.com/manual/online-store/themes/adding-themes#share-a-theme-preview-with-others) that you can share with other developers.

If you already have a development theme for your current environment, then this command replaces the development theme with your local theme. You can override this using the `--theme-editor-sync` flag.

> Note: You can't preview checkout customizations using http://127.0.0.1:9292.

Development themes are deleted when you run `shopify auth logout`. If you need a preview link that can be used after you log out, then you should [share](https://shopify.dev/docs/api/shopify-cli/theme/theme-share) your theme or [push](https://shopify.dev/docs/api/shopify-cli/theme/theme-push) to an unpublished theme on your store.

You can run this command only in a directory that matches the [default Shopify theme folder structure](https://shopify.dev/docs/themes/tools/cli#directory-structure).

```bash
shopify theme dev [flags]
```

## Flags

The following flags are available for the `theme dev` command:

### themedev

### --error-overlay <value>

env: SHOPIFY_FLAG_ERROR_OVERLAY
value: `string`

Controls the visibility of the error overlay when an theme asset upload fails: - silent Prevents the error overlay from appearing. - default Displays the error overlay.

### --host <value>

env: SHOPIFY_FLAG_HOST
value: `string`

Set which network interface the web server listens on. The default value is 127.0.0.1.

### --live-reload <value>

env: SHOPIFY_FLAG_LIVE_RELOAD
value: `string`

The live reload mode switches the server behavior when a file is modified: - hot-reload Hot reloads local changes to CSS and sections (default) - full-page  Always refreshes the entire page - off        Deactivate live reload

### --no-color

env: SHOPIFY_FLAG_NO_COLOR
value: `""`

Disable color output.

### --notify <value>

env: SHOPIFY_FLAG_NOTIFY
value: `string`

The file path or URL. The file path is to a file that you want updated on idle. The URL path is where you want a webhook posted to report on file changes.

### --open

env: SHOPIFY_FLAG_OPEN
value: `""`

Automatically launch the theme preview in your default web browser.

### --password <value>

env: SHOPIFY_CLI_THEME_TOKEN
value: `string`

Password generated from the Theme Access app.

### --path <value>

env: SHOPIFY_FLAG_PATH
value: `string`

The path where you want to run the command. Defaults to the current working directory.

### --port <value>

env: SHOPIFY_FLAG_PORT
value: `string`

Local port to serve theme preview from.

### --store-password <value>

env: SHOPIFY_FLAG_STORE_PASSWORD
value: `string`

The password for storefronts with password protection.

### --theme-editor-sync

env: SHOPIFY_FLAG_THEME_EDITOR_SYNC
value: `""`

Synchronize Theme Editor updates in the local theme files.

### --verbose

env: SHOPIFY_FLAG_VERBOSE
value: `""`

Increase the verbosity of the output.

### -e, --environment <value>

env: SHOPIFY_FLAG_ENVIRONMENT
value: `string`

The environment to apply to the current command.

### -n, --nodelete

env: SHOPIFY_FLAG_NODELETE
value: `""`

Prevents files from being deleted in the remote theme when a file has been deleted locally. This applies to files that are deleted while the command is running, and files that have been deleted locally before the command is run.

### -o, --only <value>

env: SHOPIFY_FLAG_ONLY
value: `string`

Hot reload only files that match the specified pattern.

### -s, --store <value>

env: SHOPIFY_FLAG_STORE
value: `string`

Store URL. It can be the store prefix (example) or the full myshopify.com URL (example.myshopify.com, https://example.myshopify.com).

### -t, --theme <value>

env: SHOPIFY_FLAG_THEME_ID
value: `string`

Theme ID or name of the remote theme.

### -x, --ignore <value>

env: SHOPIFY_FLAG_IGNORE
value: `string`

Skip hot reloading any files that match the specified pattern.

