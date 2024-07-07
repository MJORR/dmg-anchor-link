## DMG Anchor Link Gutenberg Block

A Gutenberg block using native WP React tools (no ACF or other plugin dependencies). This block allows editors to search for and then choose a published post to insert into the editor as a stylized anchor link.

### Features:

- Editors can search posts in the InspectorControls using a search string.
- It paginates results.
- It supports searching for a specific post ID.
- Recent posts are shown to choose from by default.
- The anchor is prepended with the words `Read More: `.
- Editors can make simple style changes.

## WP-CLI Command: `dmg-read-more-search`

Challenge: The command will execute a WP_Query search for Posts within the date range looking for posts containing the DMG Anchor Link block. Performance is key, this WP-CLI command will be tested against a database that has tens of millions of records in the wp_posts table.

Solution: Each time the block is saved a post meta value is added. This makes it much easier to quickly find all posts or pages that have DMG Anchor Link block, rather than loop through all posts searching the content of each post. 

### Command Usage:

```bash
wp dmg-read-more-search [--date-before=<date>] [--date-after=<date>]
```

Example

```bash
wp dmg-read-more-search --date-before=08-07-2024 --date-after=01-07-2024
```

If no dates are given, the function defaults to the last 30 days.
