import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";

export default function save({ attributes }) {
	const { selectedPost } = attributes;

	if (!selectedPost) {
		return;
	}

	// Extract necessary data from selectedPost
	const { title, link } = selectedPost;

	// Return the post link markup
	return (
		<p className="dmg-read-more" {...useBlockProps.save()}>
			{__("Read More: ", "dmg-anchor-link")}
			<a href={link}>{title.rendered}</a>
		</p>
	);
}
