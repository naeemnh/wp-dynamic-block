import { __ } from "@wordpress/i18n";

import { useBlockProps } from "@wordpress/block-editor";

const save = () => {
	return (
		<p {...useBlockProps.save()}>
			{__("Dynamic Block – hello from the saved content!", "dynamic-block")}
		</p>
	);
};

export default save;
