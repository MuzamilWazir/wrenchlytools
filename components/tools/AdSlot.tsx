export function AdSlot({ position }: { position: 'top' | 'bottom' }) {
  const adConfig = position === 'top'
    ? { key: '78fa117d96032cebb4a821fe66743a91', height: 50, width: 320 }
    : { key: '9bd6d766fd5c9ae406c960307ed5978a', height: 250, width: 300 };
  const adOptions = JSON.stringify({
    key: adConfig.key,
    format: 'iframe',
    height: adConfig.height,
    width: adConfig.width,
    params: {},
  });
  const adUrl = `https://www.highrevenueformat.com/${adConfig.key}/invoke.js`;
  const adDocument = `<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"></head><body style="margin:0;overflow:hidden"><script>window.atOptions=${adOptions};</script><script src="${adUrl}"></script></body></html>`;

  return (
    <aside
      aria-label="Advertisement"
      data-ad-slot={`tool-${position}`}
      className={`mx-auto mb-6 flex ${position === 'top' ? 'h-12.5 w-80' : 'h-62.5 w-75'} max-w-full items-center justify-center overflow-hidden border border-dashed border-stone-300 bg-stone-50/70 text-[10px] font-medium uppercase text-stone-400`}
    >
      <iframe
        title={`${position === 'top' ? 'Top banner' : 'Bottom rectangle'} advertisement`}
        width={adConfig.width}
        height={adConfig.height}
        srcDoc={adDocument}
        referrerPolicy="strict-origin-when-cross-origin"
        className="block max-w-full border-0"
      />
    </aside>
  );
}
