import { gql } from 'graphql-tag';

export default gql`query getPromotionalBanners {
    getPromotionalBanners {
        id
        status
        url
        start_date
        end_date
        pm_order
        banner_veiw_status
        image
        webp_image
        store_id
    }
}
`;
