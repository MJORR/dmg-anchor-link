import { __ } from "@wordpress/i18n";
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import {
	PanelBody,
	SearchControl,
	ButtonGroup,
	Button,
	Spinner,
	MenuGroup,
	MenuItem,
} from "@wordpress/components";
import { useState, useEffect } from "@wordpress/element";
import { useEntityRecords } from "@wordpress/core-data";

import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedPost, setSelectedPost] = useState(attributes.selectedPost);
	const [linkValid, setLinkValid] = useState(true); // State to track link validity

	const PER_PAGE = 4; // Set number of posts to display in search results

	const isInteger = (str) => {
		return /^\d+$/.test(str);
	};

	const searchQueryOptions = {
		per_page: PER_PAGE,
		status: "publish",
		page: currentPage,
	};

	if (isInteger(searchTerm)) {
		// Check if search term could be a Post ID
		searchQueryOptions.include = [parseInt(searchTerm, 10)];
	} else {
		searchQueryOptions.search = searchTerm;
	}

	const {
		records: searchResults = [],
		hasResolved,
		isResolving,
	} = useEntityRecords("postType", "post", searchQueryOptions);

	useEffect(() => {
		setCurrentPage(1);
	}, [searchTerm]);

	const handlePostSelect = (postId) => {
		if (isNaN(postId) || postId === null || !searchResults) {
			return;
		}

		const selectedPostObject = searchResults.find((post) => post.id === postId);

		if (selectedPostObject) {
			const {
				id,
				title: { rendered },
				link,
			} = selectedPostObject;
			setSelectedPost({ id, title: { rendered }, link });
			setAttributes({ selectedPost: { id, title: { rendered }, link } });
		}
	};

	const handlePreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const handleNextPage = () => {
		if (hasResolved && searchResults.length >= PER_PAGE) {
			setCurrentPage(currentPage + 1);
		}
	};

	useEffect(() => {
		// Function to check link status
		const checkLinkStatus = async () => {
			try {
				const response = await fetch(selectedPost.link);
				if (!response.ok) {
					setLinkValid(false); // Set linkValid to false if response is not OK
				} else {
					setLinkValid(true); // Set linkValid to true if response is OK
				}
			} catch (error) {
				console.error("Error checking link status:", error);
				setLinkValid(false); // Handle errors by setting linkValid to false
			}
		};

		// Check link status
		if (selectedPost && selectedPost.link) {
			checkLinkStatus();
		}
	}, [selectedPost]);

	const renderLinkOrMessage = () => {
		if (selectedPost && selectedPost.link) {
			if (linkValid) {
				return <a href={selectedPost.link}>{selectedPost.title.rendered}</a>;
			} else {
				return (
					<span className="warning">
						{__(
							"This link no longer exists and will not be displayed.",
							"dmg-anchor-link",
						)}
					</span>
				);
			}
		} else {
			return (
				<span>{__("Add a stylized anchor link.", "dmg-anchor-link")}</span>
			);
		}
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Post Selector", "dmg-anchor-link")}>
					<SearchControl
						value={searchTerm}
						onChange={(value) => setSearchTerm(value)}
						placeholder={__("Search Posts or Enter Post ID", "dmg-anchor-link")}
					/>

					{isResolving && <Spinner />}

					{hasResolved && searchResults.length > 0 && (
						<MenuGroup label={__("Select post", "dmg-anchor-link")}>
							{searchResults.map((post) => (
								<MenuItem
									key={post.id}
									onClick={() => handlePostSelect(post.id)}
									isSelected={selectedPost && selectedPost.id === post.id}
									style={{
										margin: "2px 0",
										backgroundColor:
											selectedPost && selectedPost.id === post.id
												? "#daedf5"
												: "#f0f5f7",
										borderLeft:
											selectedPost && selectedPost.id === post.id
												? "4px solid #007cba"
												: "4px solid transparent",
										cursor: "pointer",
									}}
								>
									{post.title.rendered}
								</MenuItem>
							))}
						</MenuGroup>
					)}

					{hasResolved && searchResults.length === 0 && (
						<p>
							{__(
								"Sorry, no results for that search term or ID.",
								"dmg-anchor-link",
							)}
						</p>
					)}

					<div className="pagination-controls">
						<p>
							{__("Results Page", "dmg-anchor-link")} {currentPage}
						</p>
						<ButtonGroup>
							<Button
								isSecondary
								disabled={currentPage <= 1}
								onClick={handlePreviousPage}
							>
								{__("Previous", "dmg-anchor-link")}
							</Button>
							<Button
								style={{
									margin: "0 6px",
								}}
								isSecondary
								disabled={!hasResolved || searchResults.length < PER_PAGE}
								onClick={handleNextPage}
							>
								{__("Next", "dmg-anchor-link")}
							</Button>
						</ButtonGroup>
					</div>
				</PanelBody>
			</InspectorControls>

			<p {...useBlockProps({ className: "dmg-read-more" })}>
				{__("Read More: ", "dmg-anchor-link")}
				{renderLinkOrMessage()}
			</p>
		</>
	);
}
