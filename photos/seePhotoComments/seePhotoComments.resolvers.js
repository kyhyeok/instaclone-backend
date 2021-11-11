import client from '../../client';

const perPageCount = 5;

export default {
    Query: {
        seePhotoComments: (_, { id, lastId }) =>
            client.comment.findMany({
                where: {
                    photoId: id,
                },
                take: perPageCount,
                skip: lastId ? 1 : 0,
                ...(lastId && { cursor: { id: lastId } }),
                orderBy: {
                    createdAt: 'asc',
                },
            }),
    },
};
