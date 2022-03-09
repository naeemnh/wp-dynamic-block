import { __ } from "@wordpress/i18n";
import { useSelect } from "@wordpress/data";
import { RawHTML } from "@wordpress/element";
// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
import { format, dateI18n, __experimentalGetSettings } from "@wordpress/date";
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import { PanelBody, ToggleControl, QueryControls } from "@wordpress/components";

import "./editor.scss";

const Edit = ({ attributes }) => {
	//Props and States
	const { numberOfPosts, displayFeaturedImage, order, orderBy } = attributes;
	const posts = useSelect(
		(select) => {
			return select("core").getEntityRecords("postType", "post", {
				per_page: numberOfPosts,
				_embed: true,
			});
		},
		[numberOfPosts]
	);

	//Prop ans State Functions
	const onDisplayFeaturedImageChange = (displayFeaturedImage) => {
		setAttributes({ displayFeaturedImage });
	};
	const onNumberOfItemsChange = (numberOfPosts) => {
		setAttributes({ numberOfPosts });
	};
	const onOrderChange = (order) => {
		setAttributes({ order });
	};
	const onOrderByChange = (orderBy) => {
		setAttributes({ orderBy });
	};

	return (
		<>
			<InspectorControls>
				<PanelBody>
					<ToggleControl
						label={__("Display Featured Image", "dynamic-block")}
						checked={displayFeaturedImage}
						onChange={onDisplayFeaturedImageChange}
					/>
					<QueryControls
						label={__("Number of Post items")}
						numberofItems={numberOfPosts}
						onNumberOfItemsChange={onNumberOfItemsChange}
						maxItems={10}
						mimItems={1}
						orderBy={orderBy}
						onOrderByChange={onOrderByChange}
						order={order}
						onOrderChange={onOrderChange}
					/>
				</PanelBody>
			</InspectorControls>
			<p {...useBlockProps()}>
				{posts &&
					posts.map(({ id, _embedded, title, excerpt, date_gmt, link }) => {
						const featuredImage =
							_embedded &&
							_embedded["wp:featuredmedia"] &&
							_embedded["wp:featuredmedia"].length > 0 &&
							_embedded["wp:featuredmedia"][0];
						return (
							<li key={id}>
								{displayFeaturedImage && featuredImage && (
									<img
										src={featuredImage.media_details.sizes.large.source_url}
										alt={featuredImage.alt_text}
									/>
								)}
								<h5>
									<a href={link}>
										{title.rendered ? (
											<RawHTML>{title.rendered}</RawHTML>
										) : (
											__("(No title)", "dynamic-block")
										)}
									</a>
								</h5>
								{date_gmt && (
									<time dateTime={format("c", date_gmt)}>
										{dateI18n(
											__experimentalGetSettings().formats.date,
											date_gmt
										)}
									</time>
								)}
								{excerpt.rendered && <RawHTML>{excerpt.rendered}</RawHTML>}
							</li>
						);
					})}
			</p>
		</>
	);
};

export default Edit;
