import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";

import "./editor.scss";
const Edit = () => {
	return (
		<p {...useBlockProps()}>
			{__("Dynamic Block – hello from the editor!", "dynamic-block")}
		</p>
	);
};

export default Edit;
