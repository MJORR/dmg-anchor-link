/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from "@wordpress/blocks";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./style.scss";

/**
 * Internal dependencies
 */
import Edit from "./edit";
import save from "./save";
import metadata from "./block.json";

const anchorIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
	>
		<path d="M13.394 21.711c-1.528.393-3.06.428-4.388.013l6.709-13.886c1.049-2.148 2.947-1.474 3.949-3.521.207-.423.305-.872.305-1.314 0-1.681-1.366-3.003-2.995-3.003-1.734 0-2.974 1.445-2.974 3.055 0 1.274.716 2.272-.082 3.903l-6.709 13.889c-1.762-1.229-3-3.596-3.449-6.104l1.848-.146-3.134-4.542-2.474 4.924 1.746-.156c.602 3.721 2.521 6.808 5.482 8.258 1.264.619 2.62.919 4.016.919 1.031 0 2.086-.179 3.141-.498-.42-.536-.755-1.139-.991-1.791zm3.606-19.712c.547 0 1 .444 1 1.001 0 .54-.441.999-1.004.999-.551 0-.996-.449-.996-1.002 0-.547.443-.998 1-.998zm2.5 13.001c-2.484 0-4.5 2.015-4.5 4.5s2.016 4.5 4.5 4.5c2.482 0 4.5-2.015 4.5-4.5s-2.018-4.5-4.5-4.5zm2.5 5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1z" />
	</svg>
);

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(metadata.name, {
	/**
	 * @see ./edit.js
	 */
	icon: anchorIcon,
	edit: Edit,
	save,
});
