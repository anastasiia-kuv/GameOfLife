function requireAll (requireContext) {
    return requireContext.keys().map(requireContext);
}

  requireAll(require.context('./mvc/', true, /^\.\/.*\.js$/));
  requireAll(require.context('./', false, /\.styl$/));
  requireAll(require.context('./image/', false, /\.(png|svg|jpg|gif)$/));
  requireAll(require.context('./favicons/', false, /\.js$/));
