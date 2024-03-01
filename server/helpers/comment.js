import Comments from '../models/comment.model.js';

export const deleteCommentsRecursively = async (parentId) => {
	// Retrieve all child comment's IDs
	let childCommentIds = (await Comments.find({ parentId: parentId })).map(
		(childComment) => childComment._id
	);
	// Retrieve all nested child comment's IDs
	let nestedChildCommentIds = [];
	for (let i = 0; i < childCommentIds.length; i++) {
		let commentIds = await deleteCommentsRecursively(childCommentIds[i]);
		nestedChildCommentIds.push(...commentIds);
	}
	// Concat everything child comment's IDs and return
	childCommentIds.push(...nestedChildCommentIds);
	return childCommentIds;
};
