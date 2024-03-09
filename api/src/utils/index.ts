function escapeRegExp(string: string) {
  return JSON.stringify(string).slice(1, -1);
}

function getPublicId(imageUrl: string) {
  const urlParts = imageUrl.split('/');
  const publicId = `social-media-app/${urlParts[urlParts.length - 2]}/${
    urlParts[urlParts.length - 1].split('.')[0]
  }`;
  return publicId;
}

export { escapeRegExp, getPublicId };
