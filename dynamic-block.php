<?php

/**
 * Change:			  Plugin Name, Function Name
 * Plugin Name:       Dynamic Block
 * Description:       Display and filter latest posts
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Naeem Hussain
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       dynamic-block
 *
 * @package           block-template
 */

function block_template_render_latest_posts_block($attributes)
{
	$args = array(
		'posts_per_page' => $attributes['numberOfPosts'],
		'posts_status' => 'publish',
		'order' => $attributes['order'],
		'orderby' => $attributes['orderBy'],
	);
	$recent_posts = get_posts($args);
	$posts = '<ul ' . get_block_wrapper_attributes() . ' >';
	foreach ($recent_posts as $post) :
		$title = get_the_title($post) ? get_the_title($post) : __('(No title)', 'dynamic-block');
		$permalink = get_the_permalink($post);
		$excerpt = get_the_excerpt($post);
		$posts .= '<li>';

		if ($attributes["displayFeaturedImage"] && has_post_thumbnail($post)) {
			$posts .= get_the_post_thumbnail($post, 'large');
		}

		$posts .= '<h5><a href="' . esc_url($permalink) . '">' . $title . '</a></h5>';
		$posts .= '<time datatime="' . esc_attr(get_the_date('c', $post)) . '">' . esc_html(get_the_date('', $post)) . '</time>';
		if (!empty($excerpt)) :
			$posts .= '<p>' . $excerpt . '</p>';
		endif;

		$posts .= '</li>';
	endforeach;
	$posts .= '</ul>';
	return $posts;
}

function block_template_dynamic_block_block_init()
{
	register_block_type(__DIR__ . '/build', array('render_callback' => 'block_template_render_latest_posts_block'));
}
add_action('init', 'block_template_dynamic_block_block_init');
