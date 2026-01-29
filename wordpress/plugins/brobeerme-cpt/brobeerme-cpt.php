<?php
/**
 * Plugin Name: BroBeerMe Custom Post Types
 * Description: Registers Beer, Brewery, and Beer Review custom post types with meta fields and REST API support.
 * Version: 1.0.0
 * Author: BroBeerMe
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Register Custom Post Types
add_action( 'init', 'bbm_register_post_types' );

function bbm_register_post_types() {
    // Beer CPT
    register_post_type( 'beer', array(
        'labels' => array(
            'name'          => 'Beers',
            'singular_name' => 'Beer',
            'add_new_item'  => 'Add New Beer',
            'edit_item'     => 'Edit Beer',
            'all_items'     => 'All Beers',
            'search_items'  => 'Search Beers',
        ),
        'public'       => true,
        'show_in_rest' => true,
        'rest_base'    => 'beer',
        'supports'     => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
        'menu_icon'    => 'dashicons-beer',
        'has_archive'  => true,
        'rewrite'      => array( 'slug' => 'beer' ),
    ) );

    // Brewery CPT
    register_post_type( 'brewery', array(
        'labels' => array(
            'name'          => 'Breweries',
            'singular_name' => 'Brewery',
            'add_new_item'  => 'Add New Brewery',
            'edit_item'     => 'Edit Brewery',
            'all_items'     => 'All Breweries',
            'search_items'  => 'Search Breweries',
        ),
        'public'       => true,
        'show_in_rest' => true,
        'rest_base'    => 'brewery',
        'supports'     => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
        'menu_icon'    => 'dashicons-building',
        'has_archive'  => true,
        'rewrite'      => array( 'slug' => 'brewery' ),
    ) );

    // Beer Review CPT
    register_post_type( 'beer_review', array(
        'labels' => array(
            'name'          => 'Beer Reviews',
            'singular_name' => 'Beer Review',
            'add_new_item'  => 'Add New Review',
            'edit_item'     => 'Edit Review',
            'all_items'     => 'All Reviews',
            'search_items'  => 'Search Reviews',
        ),
        'public'       => true,
        'show_in_rest' => true,
        'rest_base'    => 'beer_review',
        'supports'     => array( 'title', 'editor', 'thumbnail' ),
        'menu_icon'    => 'dashicons-star-filled',
        'has_archive'  => false,
        'rewrite'      => array( 'slug' => 'beer-review' ),
    ) );
}

// Register Meta Fields
add_action( 'init', 'bbm_register_meta_fields' );

function bbm_register_meta_fields() {
    $beer_meta = array(
        'brewery'             => 'string',
        'style'               => 'string',
        'abv'                 => 'number',
        'ibu'                 => 'number',
        'rating'              => 'number',
        'review_count'        => 'integer',
        'tasting_appearance'  => 'string',
        'tasting_aroma'       => 'string',
        'tasting_taste'       => 'string',
        'tasting_mouthfeel'   => 'string',
    );

    foreach ( $beer_meta as $key => $type ) {
        register_post_meta( 'beer', $key, array(
            'show_in_rest'  => true,
            'single'        => true,
            'type'          => $type,
            'auth_callback' => '__return_true',
        ) );
    }

    $brewery_meta = array(
        'address'      => 'string',
        'city'         => 'string',
        'state'        => 'string',
        'zip'          => 'string',
        'lat'          => 'number',
        'lng'          => 'number',
        'website'      => 'string',
        'phone'        => 'string',
        'hours'        => 'string',
        'rating'       => 'number',
        'review_count' => 'integer',
    );

    foreach ( $brewery_meta as $key => $type ) {
        register_post_meta( 'brewery', $key, array(
            'show_in_rest'  => true,
            'single'        => true,
            'type'          => $type,
            'auth_callback' => '__return_true',
        ) );
    }

    $review_meta = array(
        'beer_id'         => 'integer',
        'reviewer_name'   => 'string',
        'rating'          => 'number',
        'note_appearance' => 'number',
        'note_aroma'      => 'number',
        'note_taste'      => 'number',
        'note_mouthfeel'  => 'number',
    );

    foreach ( $review_meta as $key => $type ) {
        register_post_meta( 'beer_review', $key, array(
            'show_in_rest'  => true,
            'single'        => true,
            'type'          => $type,
            'auth_callback' => '__return_true',
        ) );
    }
}

// Custom REST Fields
add_action( 'rest_api_init', 'bbm_register_rest_fields' );

function bbm_register_rest_fields() {
    // Beer: tasting_notes as nested object
    register_rest_field( 'beer', 'tasting_notes', array(
        'get_callback' => function ( $post ) {
            return array(
                'appearance' => get_post_meta( $post['id'], 'tasting_appearance', true ),
                'aroma'      => get_post_meta( $post['id'], 'tasting_aroma', true ),
                'taste'      => get_post_meta( $post['id'], 'tasting_taste', true ),
                'mouthfeel'  => get_post_meta( $post['id'], 'tasting_mouthfeel', true ),
            );
        },
        'schema' => array(
            'type'       => 'object',
            'properties' => array(
                'appearance' => array( 'type' => 'string' ),
                'aroma'      => array( 'type' => 'string' ),
                'taste'      => array( 'type' => 'string' ),
                'mouthfeel'  => array( 'type' => 'string' ),
            ),
        ),
    ) );

    // Brewery: parsed hours object
    register_rest_field( 'brewery', 'parsed_hours', array(
        'get_callback' => function ( $post ) {
            $raw = get_post_meta( $post['id'], 'hours', true );
            if ( $raw ) {
                $decoded = json_decode( $raw, true );
                if ( is_array( $decoded ) ) {
                    return $decoded;
                }
            }
            return null;
        },
        'schema' => array(
            'type' => 'object',
        ),
    ) );

    // Brewery: location as nested object
    register_rest_field( 'brewery', 'location', array(
        'get_callback' => function ( $post ) {
            return array(
                'address' => get_post_meta( $post['id'], 'address', true ),
                'city'    => get_post_meta( $post['id'], 'city', true ),
                'state'   => get_post_meta( $post['id'], 'state', true ),
                'zip'     => get_post_meta( $post['id'], 'zip', true ),
                'lat'     => (float) get_post_meta( $post['id'], 'lat', true ),
                'lng'     => (float) get_post_meta( $post['id'], 'lng', true ),
            );
        },
        'schema' => array(
            'type'       => 'object',
            'properties' => array(
                'address' => array( 'type' => 'string' ),
                'city'    => array( 'type' => 'string' ),
                'state'   => array( 'type' => 'string' ),
                'zip'     => array( 'type' => 'string' ),
                'lat'     => array( 'type' => 'number' ),
                'lng'     => array( 'type' => 'number' ),
            ),
        ),
    ) );

    // Beer Review: tasting_notes as nested object
    register_rest_field( 'beer_review', 'review_tasting_notes', array(
        'get_callback' => function ( $post ) {
            return array(
                'appearance' => (float) get_post_meta( $post['id'], 'note_appearance', true ),
                'aroma'      => (float) get_post_meta( $post['id'], 'note_aroma', true ),
                'taste'      => (float) get_post_meta( $post['id'], 'note_taste', true ),
                'mouthfeel'  => (float) get_post_meta( $post['id'], 'note_mouthfeel', true ),
            );
        },
        'schema' => array(
            'type'       => 'object',
            'properties' => array(
                'appearance' => array( 'type' => 'number' ),
                'aroma'      => array( 'type' => 'number' ),
                'taste'      => array( 'type' => 'number' ),
                'mouthfeel'  => array( 'type' => 'number' ),
            ),
        ),
    ) );
}

// CORS Headers for localhost:3000
add_action( 'rest_api_init', function () {
    remove_filter( 'rest_pre_serve_request', 'rest_send_cors_headers' );
    add_filter( 'rest_pre_serve_request', function ( $value ) {
        $origin = get_http_origin();
        $allowed = array(
            'http://localhost:3000',
            'http://127.0.0.1:3000',
            'https://brobeerme.com',
            'https://www.brobeerme.com',
        );

        if ( in_array( $origin, $allowed, true ) ) {
            header( 'Access-Control-Allow-Origin: ' . $origin );
            header( 'Access-Control-Allow-Methods: GET, POST, OPTIONS' );
            header( 'Access-Control-Allow-Headers: Authorization, Content-Type' );
            header( 'Access-Control-Allow-Credentials: true' );
        }

        return $value;
    } );
}, 15 );

// REST API Filter: Allow meta ordering
add_filter( 'rest_beer_collection_params', 'bbm_add_meta_orderby', 10, 1 );
add_filter( 'rest_brewery_collection_params', 'bbm_add_meta_orderby', 10, 1 );

function bbm_add_meta_orderby( $params ) {
    $params['orderby']['enum'][] = 'meta_value';
    $params['orderby']['enum'][] = 'meta_value_num';
    $params['meta_key'] = array(
        'description' => 'Meta key to order by.',
        'type'        => 'string',
    );
    return $params;
}

add_filter( 'rest_beer_query', 'bbm_handle_meta_query', 10, 2 );
add_filter( 'rest_brewery_query', 'bbm_handle_meta_query', 10, 2 );

function bbm_handle_meta_query( $args, $request ) {
    $meta_key = $request->get_param( 'meta_key' );
    if ( $meta_key ) {
        $args['meta_key'] = sanitize_text_field( $meta_key );
    }
    return $args;
}

// Admin Menu: Seed Data
add_action( 'admin_menu', 'bbm_admin_menu' );

function bbm_admin_menu() {
    add_menu_page(
        'BroBeerMe Seed Data',
        'BBM Seed Data',
        'manage_options',
        'bbm-seed-data',
        'bbm_seed_data_page',
        'dashicons-database',
        80
    );
}

function bbm_seed_data_page() {
    if ( isset( $_POST['bbm_seed_action'] ) && check_admin_referer( 'bbm_seed_nonce' ) ) {
        bbm_seed_all_data();
        echo '<div class="notice notice-success"><p>Seed data created successfully!</p></div>';
    }
    ?>
    <div class="wrap">
        <h1>BroBeerMe Seed Data</h1>
        <p>Click the button below to create sample beers, breweries, and reviews.</p>
        <form method="post">
            <?php wp_nonce_field( 'bbm_seed_nonce' ); ?>
            <input type="hidden" name="bbm_seed_action" value="1" />
            <?php submit_button( 'Seed All Data', 'primary', 'submit', true ); ?>
        </form>
    </div>
    <?php
}

// Seed Data Function
function bbm_seed_all_data() {
    // Beers
    $beers = array(
        array(
            'title'   => 'Hazy IPA',
            'slug'    => 'hazy-ipa',
            'content' => 'A juicy, tropical hop bomb bursting with notes of mango, citrus, and stone fruit. Hazy and unfiltered with a pillowy soft mouthfeel that makes every sip dangerously drinkable.',
            'meta'    => array(
                'brewery'            => 'Local Craft Co.',
                'style'              => 'New England IPA',
                'abv'                => 6.8,
                'ibu'                => 55,
                'rating'             => 4.5,
                'review_count'       => 234,
                'tasting_appearance' => 'Deep golden haze, persistent white head with excellent lacing',
                'tasting_aroma'      => 'Tropical fruit explosion - mango, passionfruit, tangerine zest',
                'tasting_taste'      => 'Juicy citrus up front, soft bitterness, finishes with ripe peach',
                'tasting_mouthfeel'  => 'Creamy, medium-full body, pillowy carbonation',
            ),
        ),
        array(
            'title'   => 'Amber Lager',
            'slug'    => 'amber-lager',
            'content' => 'A crisp and clean amber lager with rich caramel malt sweetness balanced by noble hop character.',
            'meta'    => array(
                'brewery'            => 'Mountain Brewing',
                'style'              => 'Vienna Lager',
                'abv'                => 5.2,
                'ibu'                => 22,
                'rating'             => 4.2,
                'review_count'       => 189,
                'tasting_appearance' => 'Brilliant amber-copper, crystal clear, off-white head',
                'tasting_aroma'      => 'Toasty malt, light honey, subtle floral hops',
                'tasting_taste'      => 'Caramel and biscuit malt, balanced bitterness, clean finish',
                'tasting_mouthfeel'  => 'Medium body, smooth, moderate carbonation',
            ),
        ),
        array(
            'title'   => 'Chocolate Stout',
            'slug'    => 'chocolate-stout',
            'content' => 'An indulgent imperial stout brewed with cacao nibs from a local chocolatier and cold-brew coffee.',
            'meta'    => array(
                'brewery'            => 'Dark Horse Brewery',
                'style'              => 'Imperial Stout',
                'abv'                => 7.5,
                'ibu'                => 45,
                'rating'             => 4.8,
                'review_count'       => 312,
                'tasting_appearance' => 'Jet black, opaque, tan creamy head',
                'tasting_aroma'      => 'Dark chocolate, espresso, vanilla, hint of dark fruit',
                'tasting_taste'      => 'Rich cocoa, roasted coffee, brown sugar, oak vanilla finish',
                'tasting_mouthfeel'  => 'Full body, velvety smooth, low carbonation, warming',
            ),
        ),
        array(
            'title'   => 'Tropical Sour',
            'slug'    => 'tropical-sour',
            'content' => 'A tart and refreshing sour ale fermented with passionfruit and guava puree.',
            'meta'    => array(
                'brewery'            => 'Wild Side Ales',
                'style'              => 'Fruited Sour Ale',
                'abv'                => 4.5,
                'ibu'                => 8,
                'rating'             => 4.3,
                'review_count'       => 156,
                'tasting_appearance' => 'Hazy peach-pink, thin white head, effervescent',
                'tasting_aroma'      => 'Passionfruit, guava, light citrus, yogurt tang',
                'tasting_taste'      => 'Tart passionfruit, sweet guava, clean lactic acidity',
                'tasting_mouthfeel'  => 'Light body, high carbonation, refreshingly dry',
            ),
        ),
        array(
            'title'   => 'West Coast IPA',
            'slug'    => 'west-coast-ipa',
            'content' => 'A classic West Coast IPA with assertive pine and grapefruit hop character backed by a firm malt backbone.',
            'meta'    => array(
                'brewery'            => 'Coastline Brewing Co.',
                'style'              => 'American IPA',
                'abv'                => 7.0,
                'ibu'                => 70,
                'rating'             => 4.4,
                'review_count'       => 201,
                'tasting_appearance' => 'Deep gold, brilliant clarity, white head',
                'tasting_aroma'      => 'Pine resin, grapefruit, dank herbs',
                'tasting_taste'      => 'Bold grapefruit and pine, cracker malt, long bitter finish',
                'tasting_mouthfeel'  => 'Medium body, snappy carbonation, dry finish',
            ),
        ),
        array(
            'title'   => 'Belgian Tripel',
            'slug'    => 'belgian-tripel',
            'content' => 'A strong Belgian-style ale with complex fruity esters and spicy phenolics from our house yeast.',
            'meta'    => array(
                'brewery'            => 'Abbey Road Brewing',
                'style'              => 'Belgian Tripel',
                'abv'                => 8.5,
                'ibu'                => 30,
                'rating'             => 4.6,
                'review_count'       => 178,
                'tasting_appearance' => 'Pale gold, slight haze, rocky white head',
                'tasting_aroma'      => 'Banana, clove, white pepper, light honey',
                'tasting_taste'      => 'Honey, pear, spicy yeast, dry peppery finish',
                'tasting_mouthfeel'  => 'Medium-light body, effervescent carbonation, warming alcohol',
            ),
        ),
        array(
            'title'   => 'Oatmeal Stout',
            'slug'    => 'oatmeal-stout',
            'content' => 'A sessionable dark ale brewed with flaked oats for a silky smooth body.',
            'meta'    => array(
                'brewery'            => 'Fireside Brewing',
                'style'              => 'Oatmeal Stout',
                'abv'                => 5.8,
                'ibu'                => 35,
                'rating'             => 4.1,
                'review_count'       => 145,
                'tasting_appearance' => 'Very dark brown, near-black, tan head',
                'tasting_aroma'      => 'Coffee, milk chocolate, light roast',
                'tasting_taste'      => 'Smooth coffee, oat sweetness, subtle chocolate',
                'tasting_mouthfeel'  => 'Medium body, silky from oats, moderate carbonation',
            ),
        ),
        array(
            'title'   => 'Hefeweizen',
            'slug'    => 'hefeweizen',
            'content' => 'A traditional Bavarian wheat beer with pronounced banana and clove character.',
            'meta'    => array(
                'brewery'            => 'Bavarian Brothers',
                'style'              => 'Hefeweizen',
                'abv'                => 5.0,
                'ibu'                => 12,
                'rating'             => 4.0,
                'review_count'       => 167,
                'tasting_appearance' => 'Pale straw, cloudy, fluffy white head',
                'tasting_aroma'      => 'Banana, clove, bubblegum, wheat',
                'tasting_taste'      => 'Banana bread, light clove spice, soft wheat',
                'tasting_mouthfeel'  => 'Light-medium body, high carbonation, creamy',
            ),
        ),
    );

    $beer_ids = array();
    foreach ( $beers as $beer ) {
        $existing = get_page_by_path( $beer['slug'], OBJECT, 'beer' );
        if ( $existing ) {
            $beer_ids[ $beer['slug'] ] = $existing->ID;
            continue;
        }

        $post_id = wp_insert_post( array(
            'post_title'   => $beer['title'],
            'post_name'    => $beer['slug'],
            'post_content' => $beer['content'],
            'post_status'  => 'publish',
            'post_type'    => 'beer',
        ) );

        if ( ! is_wp_error( $post_id ) ) {
            foreach ( $beer['meta'] as $key => $value ) {
                update_post_meta( $post_id, $key, $value );
            }
            $beer_ids[ $beer['slug'] ] = $post_id;
        }
    }

    // Breweries
    $breweries = array(
        array(
            'title'   => 'Local Craft Co.',
            'slug'    => 'local-craft-co',
            'content' => 'A neighborhood brewery dedicated to pushing the boundaries of hop-forward beers.',
            'meta'    => array(
                'address'      => '123 Brewers Lane',
                'city'         => 'Austin',
                'state'        => 'TX',
                'zip'          => '78701',
                'lat'          => 30.2672,
                'lng'          => -97.7431,
                'website'      => 'https://localcraftco.com',
                'phone'        => '(512) 555-0123',
                'hours'        => '{"Monday":"Closed","Tuesday":"3pm - 10pm","Wednesday":"3pm - 10pm","Thursday":"3pm - 11pm","Friday":"12pm - 12am","Saturday":"12pm - 12am","Sunday":"12pm - 8pm"}',
                'rating'       => 4.6,
                'review_count' => 324,
            ),
        ),
        array(
            'title'   => 'Mountain Brewing',
            'slug'    => 'mountain-brewing',
            'content' => 'Nestled in the hills outside Austin, Mountain Brewing combines old-world lager tradition with Texas innovation.',
            'meta'    => array(
                'address'      => '456 Summit Road',
                'city'         => 'Austin',
                'state'        => 'TX',
                'zip'          => '78733',
                'lat'          => 30.3525,
                'lng'          => -97.8283,
                'website'      => 'https://mountainbrewing.com',
                'phone'        => '(512) 555-0456',
                'hours'        => '{"Monday":"Closed","Tuesday":"Closed","Wednesday":"4pm - 9pm","Thursday":"4pm - 9pm","Friday":"2pm - 11pm","Saturday":"12pm - 11pm","Sunday":"12pm - 7pm"}',
                'rating'       => 4.4,
                'review_count' => 218,
            ),
        ),
        array(
            'title'   => 'Dark Horse Brewery',
            'slug'    => 'dark-horse-brewery',
            'content' => 'Specialists in dark, complex ales. Our barrel-aging program features over 200 bourbon, wine, and rum barrels.',
            'meta'    => array(
                'address'      => '789 Dark Alley',
                'city'         => 'Austin',
                'state'        => 'TX',
                'zip'          => '78704',
                'lat'          => 30.2489,
                'lng'          => -97.7501,
                'website'      => 'https://darkhorsebrewery.com',
                'phone'        => '(512) 555-0789',
                'hours'        => '{"Monday":"Closed","Tuesday":"4pm - 10pm","Wednesday":"4pm - 10pm","Thursday":"4pm - 11pm","Friday":"2pm - 12am","Saturday":"12pm - 12am","Sunday":"12pm - 9pm"}',
                'rating'       => 4.8,
                'review_count' => 412,
            ),
        ),
        array(
            'title'   => 'Wild Side Ales',
            'slug'    => 'wild-side-ales',
            'content' => 'Austin\'s premier sour and wild ale producer.',
            'meta'    => array(
                'address'      => '321 Funky Blvd',
                'city'         => 'Austin',
                'state'        => 'TX',
                'zip'          => '78702',
                'lat'          => 30.2950,
                'lng'          => -97.7155,
                'website'      => 'https://wildsideales.com',
                'phone'        => '(512) 555-0321',
                'hours'        => '{"Monday":"Closed","Tuesday":"Closed","Wednesday":"5pm - 10pm","Thursday":"5pm - 10pm","Friday":"3pm - 11pm","Saturday":"1pm - 11pm","Sunday":"1pm - 7pm"}',
                'rating'       => 4.5,
                'review_count' => 187,
            ),
        ),
        array(
            'title'   => 'Coastline Brewing Co.',
            'slug'    => 'coastline-brewing-co',
            'content' => 'Bringing West Coast IPA culture to Central Texas.',
            'meta'    => array(
                'address'      => '555 Hop Street',
                'city'         => 'Austin',
                'state'        => 'TX',
                'zip'          => '78745',
                'lat'          => 30.2210,
                'lng'          => -97.7690,
                'website'      => 'https://coastlinebrewing.com',
                'phone'        => '(512) 555-0555',
                'hours'        => '{"Monday":"Closed","Tuesday":"4pm - 10pm","Wednesday":"4pm - 10pm","Thursday":"4pm - 10pm","Friday":"12pm - 12am","Saturday":"12pm - 12am","Sunday":"12pm - 8pm"}',
                'rating'       => 4.3,
                'review_count' => 256,
            ),
        ),
        array(
            'title'   => 'Abbey Road Brewing',
            'slug'    => 'abbey-road-brewing',
            'content' => 'A Belgian-inspired brewery and taproom where traditional techniques meet Texas creativity.',
            'meta'    => array(
                'address'      => '888 Monastery Way',
                'city'         => 'Austin',
                'state'        => 'TX',
                'zip'          => '78757',
                'lat'          => 30.3080,
                'lng'          => -97.7530,
                'website'      => 'https://abbeyroadbrewing.com',
                'phone'        => '(512) 555-0888',
                'hours'        => '{"Monday":"Closed","Tuesday":"Closed","Wednesday":"4pm - 10pm","Thursday":"4pm - 10pm","Friday":"2pm - 11pm","Saturday":"12pm - 11pm","Sunday":"12pm - 8pm"}',
                'rating'       => 4.7,
                'review_count' => 198,
            ),
        ),
        array(
            'title'   => 'Fireside Brewing',
            'slug'    => 'fireside-brewing',
            'content' => 'A cozy brewpub specializing in sessionable, easy-drinking ales.',
            'meta'    => array(
                'address'      => '222 Ember Court',
                'city'         => 'Austin',
                'state'        => 'TX',
                'zip'          => '78703',
                'lat'          => 30.2785,
                'lng'          => -97.7320,
                'website'      => 'https://firesidebrewing.com',
                'phone'        => '(512) 555-0222',
                'hours'        => '{"Monday":"4pm - 10pm","Tuesday":"4pm - 10pm","Wednesday":"4pm - 10pm","Thursday":"4pm - 11pm","Friday":"12pm - 12am","Saturday":"12pm - 12am","Sunday":"12pm - 9pm"}',
                'rating'       => 4.2,
                'review_count' => 345,
            ),
        ),
        array(
            'title'   => 'Bavarian Brothers',
            'slug'    => 'bavarian-brothers',
            'content' => 'Authentic German-style beers brewed to Reinheitsgebot purity standards.',
            'meta'    => array(
                'address'      => '999 Prost Avenue',
                'city'         => 'Austin',
                'state'        => 'TX',
                'zip'          => '78752',
                'lat'          => 30.3320,
                'lng'          => -97.7080,
                'website'      => 'https://bavarianbrothers.com',
                'phone'        => '(512) 555-0999',
                'hours'        => '{"Monday":"Closed","Tuesday":"4pm - 10pm","Wednesday":"4pm - 10pm","Thursday":"4pm - 10pm","Friday":"12pm - 12am","Saturday":"11am - 12am","Sunday":"11am - 9pm"}',
                'rating'       => 4.4,
                'review_count' => 289,
            ),
        ),
    );

    foreach ( $breweries as $brewery ) {
        $existing = get_page_by_path( $brewery['slug'], OBJECT, 'brewery' );
        if ( $existing ) {
            continue;
        }

        $post_id = wp_insert_post( array(
            'post_title'   => $brewery['title'],
            'post_name'    => $brewery['slug'],
            'post_content' => $brewery['content'],
            'post_status'  => 'publish',
            'post_type'    => 'brewery',
        ) );

        if ( ! is_wp_error( $post_id ) ) {
            foreach ( $brewery['meta'] as $key => $value ) {
                update_post_meta( $post_id, $key, $value );
            }
        }
    }

    // Reviews
    $hazy_id  = isset( $beer_ids['hazy-ipa'] ) ? $beer_ids['hazy-ipa'] : 0;
    $stout_id = isset( $beer_ids['chocolate-stout'] ) ? $beer_ids['chocolate-stout'] : 0;

    $reviews = array(
        array(
            'title'   => 'Review: Hazy IPA by HopHead Mike',
            'slug'    => 'hazy-ipa-review-1',
            'content' => 'Absolutely crushable! The mango and citrus notes are incredibly vibrant. This is my go-to hazy and it never disappoints. The mouthfeel is like drinking a cloud.',
            'meta'    => array(
                'beer_id'         => $hazy_id,
                'reviewer_name'   => 'HopHead Mike',
                'rating'          => 5,
                'note_appearance' => 4,
                'note_aroma'      => 5,
                'note_taste'      => 5,
                'note_mouthfeel'  => 5,
            ),
        ),
        array(
            'title'   => 'Review: Hazy IPA by CraftBeerSarah',
            'slug'    => 'hazy-ipa-review-2',
            'content' => 'Great hazy IPA with tons of tropical character. Only knock is it\'s a touch sweet for my taste. But the aroma when you crack the can is unreal.',
            'meta'    => array(
                'beer_id'         => $hazy_id,
                'reviewer_name'   => 'CraftBeerSarah',
                'rating'          => 4,
                'note_appearance' => 4,
                'note_aroma'      => 5,
                'note_taste'      => 4,
                'note_mouthfeel'  => 4,
            ),
        ),
        array(
            'title'   => 'Review: Hazy IPA by BrewDogDave',
            'slug'    => 'hazy-ipa-review-3',
            'content' => 'One of the best NEIPAs I\'ve had outside of New England. Incredible hop aroma and that pillowy soft body. Bought a case immediately.',
            'meta'    => array(
                'beer_id'         => $hazy_id,
                'reviewer_name'   => 'BrewDogDave',
                'rating'          => 5,
                'note_appearance' => 5,
                'note_aroma'      => 5,
                'note_taste'      => 5,
                'note_mouthfeel'  => 4,
            ),
        ),
        array(
            'title'   => 'Review: Hazy IPA by BeerNovice22',
            'slug'    => 'hazy-ipa-review-4',
            'content' => 'I\'m new to craft beer and this was a great introduction to IPAs. Not too bitter, very fruity and approachable. Will definitely try more from this brewery.',
            'meta'    => array(
                'beer_id'         => $hazy_id,
                'reviewer_name'   => 'BeerNovice22',
                'rating'          => 4,
                'note_appearance' => 4,
                'note_aroma'      => 4,
                'note_taste'      => 4,
                'note_mouthfeel'  => 4,
            ),
        ),
        array(
            'title'   => 'Review: Chocolate Stout by DarkBeerDan',
            'slug'    => 'chocolate-stout-review-1',
            'content' => 'This is the stout that got me into stouts. The chocolate and coffee balance is perfection. The oak aging adds just the right amount of complexity.',
            'meta'    => array(
                'beer_id'         => $stout_id,
                'reviewer_name'   => 'DarkBeerDan',
                'rating'          => 5,
                'note_appearance' => 5,
                'note_aroma'      => 5,
                'note_taste'      => 5,
                'note_mouthfeel'  => 5,
            ),
        ),
        array(
            'title'   => 'Review: Chocolate Stout by StoutSnob',
            'slug'    => 'chocolate-stout-review-2',
            'content' => 'Pours like motor oil, drinks like liquid dessert. The cacao nibs are clearly high quality - you get real chocolate, not that artificial candy flavor. Outstanding.',
            'meta'    => array(
                'beer_id'         => $stout_id,
                'reviewer_name'   => 'StoutSnob',
                'rating'          => 5,
                'note_appearance' => 5,
                'note_aroma'      => 5,
                'note_taste'      => 5,
                'note_mouthfeel'  => 4,
            ),
        ),
    );

    foreach ( $reviews as $review ) {
        $existing = get_page_by_path( $review['slug'], OBJECT, 'beer_review' );
        if ( $existing ) {
            continue;
        }

        $post_id = wp_insert_post( array(
            'post_title'   => $review['title'],
            'post_name'    => $review['slug'],
            'post_content' => $review['content'],
            'post_status'  => 'publish',
            'post_type'    => 'beer_review',
        ) );

        if ( ! is_wp_error( $post_id ) ) {
            foreach ( $review['meta'] as $key => $value ) {
                update_post_meta( $post_id, $key, $value );
            }
        }
    }

    // Blog Posts
    $blog_posts = array(
        array(
            'title'   => 'The Rise of Hazy IPAs: Why Juice Bombs Took Over Craft Beer',
            'slug'    => 'rise-of-hazy-ipas',
            'excerpt' => 'From a regional curiosity to the most popular craft beer style in America - how New England IPAs changed everything we thought we knew about hoppy beer.',
            'content' => 'The craft beer world has experienced plenty of revolutions, but few have been as rapid and complete as the rise of the hazy IPA. In less than a decade, what started as an underground New England phenomenon has become the single most popular style at craft breweries across the country.

It all started in the early 2010s at small breweries like The Alchemist and Tree House in New England. These brewers discovered that by adjusting their water chemistry, using specific yeast strains, and dry-hopping during active fermentation, they could create IPAs with an entirely different character than the clear, bitter West Coast IPAs that dominated the market.

Today, virtually every craft brewery in America has at least one hazy IPA on their tap list. The style has evolved into sub-categories - milkshake IPAs, smoothie IPAs, cold IPAs - each pushing the boundaries further.',
            'date'    => '2025-01-20',
            'cats'    => array( 'Beer Styles', 'Industry' ),
            'tags'    => array( 'IPA', 'hazy', 'craft beer', 'trends' ),
        ),
        array(
            'title'   => 'A Beginner\'s Guide to Beer Tasting: How to Train Your Palate',
            'slug'    => 'beginners-guide-beer-tasting',
            'excerpt' => 'Ready to go beyond \"I like it\" or \"I don\'t\"? Learn the fundamentals of beer tasting - from proper glassware to identifying off-flavors.',
            'content' => 'You don\'t need to be a certified cicerone to taste beer thoughtfully. With a few simple techniques, you can dramatically improve your ability to identify flavors, appreciate complexity, and describe what you\'re drinking.

The Five S\'s of Beer Tasting: See, Swirl, Smell, Sip, Savor. Hold your glass up to the light. What color is it? Is it clear or hazy? Gently swirl the beer in your glass to release aromatics. Take short sniffs rather than one long inhale. Take a moderate sip and let it coat your entire palate. After swallowing, breathe out through your nose for retronasal olfaction.

The best way to develop your palate is to taste deliberately and often. Try side-by-side comparisons of different styles. Keep tasting notes. And most importantly, trust your own palate.',
            'date'    => '2025-01-15',
            'cats'    => array( 'Education', 'Guides' ),
            'tags'    => array( 'tasting', 'beginners', 'guide', 'palate' ),
        ),
        array(
            'title'   => 'Austin\'s Best Kept Secret Breweries You Need to Visit',
            'slug'    => 'austin-secret-breweries',
            'excerpt' => 'Beyond the big names, Austin has a thriving underground beer scene. We visited 10 under-the-radar breweries that deserve way more attention.',
            'content' => 'Austin, Texas is known for its vibrant craft beer scene, but most visitors only scratch the surface. While iconic spots draw crowds, there\'s a thriving ecosystem of smaller breweries doing incredible work without the fanfare.

Dark Horse Brewery: Tucked away in a converted warehouse in South Austin, doing some of the most impressive barrel-aged stouts in Texas.

Wild Side Ales: If you\'re into sour beer, Wild Side is a revelation. Their coolship program produces spontaneously fermented ales with remarkable complexity.

Fireside Brewing: This cozy brewpub pairs outstanding sessionable ales with wood-fired pizza.',
            'date'    => '2025-01-10',
            'cats'    => array( 'Travel', 'Local' ),
            'tags'    => array( 'Austin', 'breweries', 'travel', 'local' ),
        ),
        array(
            'title'   => 'Stout Season: 5 Dark Beers to Warm Your Winter',
            'slug'    => 'stout-season-winter-beers',
            'excerpt' => 'When the temperature drops, it\'s time for rich, warming dark beers. Here are five stouts and porters that belong in your winter rotation.',
            'content' => 'There\'s something deeply satisfying about cracking open a pitch-black stout on a cold evening. The roasted malts, the chocolate and coffee notes, the warming alcohol - dark beers are built for winter.

Dark Horse Chocolate Stout: An imperial stout brewed with cacao nibs and cold brew coffee. Rich, velvety, and dangerously drinkable.

Fireside Oatmeal Stout: The most sessionable beer on this list at 5.8%, but the flavor is full and satisfying. Silky from the oats with a perfect balance of coffee and chocolate.',
            'date'    => '2025-01-05',
            'cats'    => array( 'Beer Styles', 'Seasonal' ),
            'tags'    => array( 'stout', 'porter', 'winter', 'dark beer' ),
        ),
        array(
            'title'   => 'From Grain to Glass: How Craft Beer Is Made',
            'slug'    => 'grain-to-glass-how-beer-is-made',
            'excerpt' => 'Ever wondered what happens between the farm and your pint glass? A complete breakdown of the brewing process from malting to packaging.',
            'content' => 'Beer is one of humanity\'s oldest beverages, yet the process of making it remains a fascinating blend of science and art.

Step 1: Malting - grain is soaked, germinated, and kiln-dried. Step 2: Mashing - crushed malt mixed with hot water to convert starches to sugars. Step 3: Lautering and Boiling - wort is separated and boiled with hops. Step 4: Fermentation - yeast consumes sugars, producing alcohol and CO2. Step 5: Conditioning - beer ages to mellow flavors. Step 6: Packaging - carbonated and packaged.

Simple ingredients, complex results. That\'s the beauty of brewing.',
            'date'    => '2024-12-28',
            'cats'    => array( 'Education', 'Brewing' ),
            'tags'    => array( 'brewing', 'process', 'education', 'beginners' ),
        ),
        array(
            'title'   => 'IPA vs. Pale Ale: What\'s the Difference?',
            'slug'    => 'ipa-vs-pale-ale',
            'excerpt' => 'They\'re both hoppy, they\'re both popular - but IPAs and pale ales are distinct styles with different histories. Here\'s how to tell them apart.',
            'content' => 'It\'s one of the most common questions in craft beer: what\'s the difference between an IPA and a pale ale? They\'re closely related, but understanding the distinction will help you order with confidence.

An IPA (India Pale Ale) is essentially a bigger, hoppier, stronger version of a pale ale. Pale ales typically have 4.5-6.5% ABV and 30-50 IBU. IPAs range from 5.5-7.5% ABV and 40-70+ IBU.

Want something balanced and easy? Go pale ale. Want something bold and hop-forward? Go IPA. New to craft beer? Start with a pale ale and work your way up.',
            'date'    => '2024-12-20',
            'cats'    => array( 'Education', 'Beer Styles' ),
            'tags'    => array( 'IPA', 'pale ale', 'comparison', 'education' ),
        ),
    );

    foreach ( $blog_posts as $bp ) {
        $existing = get_page_by_path( $bp['slug'], OBJECT, 'post' );
        if ( $existing ) {
            continue;
        }

        // Create/get categories
        $cat_ids = array();
        foreach ( $bp['cats'] as $cat_name ) {
            $term = term_exists( $cat_name, 'category' );
            if ( ! $term ) {
                $term = wp_insert_term( $cat_name, 'category' );
            }
            if ( ! is_wp_error( $term ) ) {
                $cat_ids[] = is_array( $term ) ? (int) $term['term_id'] : (int) $term;
            }
        }

        wp_insert_post( array(
            'post_title'    => $bp['title'],
            'post_name'     => $bp['slug'],
            'post_content'  => $bp['content'],
            'post_excerpt'  => $bp['excerpt'],
            'post_status'   => 'publish',
            'post_type'     => 'post',
            'post_date'     => $bp['date'] . ' 12:00:00',
            'post_category' => $cat_ids,
            'tags_input'    => $bp['tags'],
        ) );
    }
}
