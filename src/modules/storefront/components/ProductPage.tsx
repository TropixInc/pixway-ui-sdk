import { useRef, useState } from 'react';
import { useClickAway } from 'react-use';

import { useRouterConnect } from '../../shared';
import { ReactComponent as ArrowDown } from '../../shared/assets/icons/arrowDown.svg';
import { ReactComponent as BackButton } from '../../shared/assets/icons/arrowLeftOutlined.svg';
import { ImageSDK } from '../../shared/components/ImageSDK';
import { PixwayAppRoutes } from '../../shared/enums/PixwayAppRoutes';
import { convertSpacingToCSS } from '../../shared/utils/convertSpacingToCSS';
import useGetProductBySlug from '../hooks/useGetProductBySlug/useGetProductBySlug';
import { ProductPageData } from '../interfaces';

interface ProductPageProps {
  data: ProductPageData;
  params?: string[];
}

export const ProductPage = ({ data, params }: ProductPageProps) => {
  const { back, pushConnect } = useRouterConnect();
  const refToClickAway = useRef<HTMLDivElement>(null);
  useClickAway(refToClickAway, () => {
    if (quantityOpen) {
      setQuantityOpen(false);
    }
  });
  const [quantity, setQuantity] = useState(1);
  const [quantityOpen, setQuantityOpen] = useState(false);
  const { data: product } = useGetProductBySlug(params?.[params.length - 1]);
  const categories: any[] = [];
  return (
    <div
      style={{
        margin: convertSpacingToCSS(data.styleData.margin),
        padding: convertSpacingToCSS(data.styleData.padding),
      }}
    >
      <div
        style={{
          backgroundColor: data.styleData.backBackgroundColor ?? 'white',
        }}
      >
        <div
          onClick={() => back()}
          className="pw-container pw-mx-auto pw-flex pw-items-center pw-gap-6 pw-py-4 pw-cursor-pointer pw-px-4 sm:pw-px-0"
        >
          <BackButton
            style={{
              stroke:
                data.styleData.backTextColor ?? data.styleData.textColor
                  ? data.styleData.textColor
                  : '#777E8F',
            }}
          />
          <p
            style={{
              color:
                data.styleData.backTextColor ?? data.styleData.textColor
                  ? data.styleData.textColor
                  : '#777E8F',
            }}
            className="pw-text-sm"
          >
            Voltar
          </p>
        </div>
      </div>
      <div
        className="pw-min-h-[95vh]"
        style={{ backgroundColor: data.styleData.backgroundColor ?? '#EFEFEF' }}
      >
        <div className="pw-container pw-mx-auto pw-px-4 sm:pw-px-0 pw-pt-6">
          <div className="pw-flex pw-flex-col sm:pw-flex-row pw-w-full pw-gap-8">
            <div className="pw-max-h-[500px]  pw-flex-1">
              <ImageSDK
                className="pw-w-full pw-max-h-[400px] sm:pw-max-h-[500px] pw-object-cover pw-object-center"
                src={product?.images[0].original}
              />
            </div>
            <div className="pw-max-w-[400px] pw-w-full">
              {data.styleData.showProductName && (
                <>
                  <p
                    style={{ color: data.styleData.textColor ?? 'black' }}
                    className="pw-text-sm"
                  >
                    Título ou nome do item
                  </p>
                  <p
                    style={{ color: data.styleData.nameTextColor ?? 'black' }}
                    className="pw-text-[36px] pw-font-[600]"
                  >
                    {product?.name}
                  </p>
                </>
              )}
              {data.styleData.showCategory && (
                <p
                  style={{
                    color: data.styleData.categoriesTextColor ?? '#C63535',
                  }}
                  className="pw-mt-4 pw-font-[700] pw-text-lg"
                >
                  {product?.tags?.join('/')}
                </p>
              )}
              {data.styleData.showValue && (
                <p
                  style={{ color: data.styleData.priceTextColor ?? 'black' }}
                  className="pw-text-2xl pw-mt-4 pw-font-[700]"
                >
                  {product?.stockAmount == 0
                    ? 'Esgotado'
                    : product
                    ? `${product?.prices[0].currency.symbol} ${product?.prices[0].amount}`
                    : ''}
                </p>
              )}
              {data.styleData.actionButton &&
                product?.stockAmount &&
                product?.stockAmount > 0 && (
                  <div>
                    <div ref={refToClickAway} className="pw-mt-4">
                      <p className="pw-text-sm pw-text-black pw-mb-1">
                        Quantidade
                      </p>
                      <div
                        onClick={() => setQuantityOpen(!quantityOpen)}
                        className={`pw-w-[120px]  pw-p-3 pw-flex pw-items-center pw-rounded-lg pw-justify-between pw-cursor-pointer ${
                          quantityOpen
                            ? 'pw-border-none pw-bg-white'
                            : 'pw-border pw-border-black'
                        }`}
                      >
                        <p className="pw-text-xs pw-font-[600] pw-text-black">
                          {quantity}
                        </p>
                        <ArrowDown className="pw-stroke-black" />
                      </div>
                      {quantityOpen && (
                        <div className="pw-relative">
                          <div className="pw-absolute pw-bg-white -pw-mt-1 pw-w-[120px] pw-flex pw-flex-col pw-py-1 pw-rounded-b-l ">
                            <div className="pw-border-t pw-bg-slate-400 pw-mx-3 pw-h-px"></div>
                            <div className=""></div>
                            {Array(
                              product?.stockAmount && product?.stockAmount > 5
                                ? 5
                                : product?.stockAmount
                            )
                              .fill(0)
                              .map((val, index) => (
                                <p
                                  onClick={() => {
                                    setQuantity(index + 1);
                                    setQuantityOpen(false);
                                  }}
                                  key={index}
                                  className="pw-px-3 pw-py-2 pw-text-sm pw-cursor-pointer hover:pw-bg-slate-100 pw-text-black"
                                >
                                  {index + 1}
                                </p>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              {data.styleData.showCategory && product?.tags?.length ? (
                <>
                  <p
                    style={{ color: data.styleData.textColor ?? 'black' }}
                    className="pw-mt-4 pw-text-sm"
                  >
                    Categoria/subcategoria:
                  </p>
                  <div className="pw-flex pw-items-center pw-gap-4 pw-mt-6">
                    {categories.map((cat) => (
                      <div
                        key={cat.name}
                        style={{
                          backgroundColor:
                            data.styleData.categoriesTagBackgroundColor ??
                            'white',
                          color:
                            data.styleData.categoriesTagTextColor ?? 'black',
                        }}
                        className="pw-py-2 pw-px-6 pw-text-sm pw-font-[600] pw-shadow-[0_2px_4px_rgba(0,0,0,0.26)]"
                      >
                        {cat.name}
                      </div>
                    ))}
                  </div>
                </>
              ) : null}
              {data.styleData.actionButton && (
                <button
                  disabled={product?.stockAmount == 0}
                  onClick={() => {
                    if (product?.id && product.prices) {
                      pushConnect(
                        PixwayAppRoutes.CHECKOUT_CONFIRMATION +
                          `?productIds=${Array(quantity)
                            .fill(product.id)
                            .join(',')}&currencyId=${
                            product.prices[0].currencyId
                          }`
                      );
                    }
                  }}
                  style={{
                    backgroundColor:
                      product && product.stockAmount == 0
                        ? '#DCDCDC'
                        : data.styleData.buttonColor
                        ? data.styleData.buttonColor
                        : '#0050FF',
                    color:
                      product && product.stockAmount == 0
                        ? '#777E8F'
                        : data.styleData.buttonTextColor ?? 'white',
                  }}
                  className="pw-py-[10px] pw-px-[60px] pw-font-[500] pw-text-xs pw-mt-6 pw-rounded-full pw-shadow-[0_2px_4px_rgba(0,0,0,0.26)]"
                >
                  {data.styleData.buttonText ?? 'Comprar agora'}
                </button>
              )}
            </div>
          </div>
          {data.styleData.showDescription && (
            <div className="pw-mt-6 sm:pw-mt-0">
              <p
                style={{
                  color: data.styleData.descriptionTextColor ?? 'black',
                }}
                className="pw-text-2xl pw-font-[600] pw-mt-3"
              >
                Descrição
              </p>
              {product?.htmlContent && product?.htmlContent != '' ? (
                <div
                  style={{
                    color: data.styleData.descriptionTextColor ?? 'black',
                  }}
                  className="pw-text-sm pw-pb-8 pw-mt-6"
                  dangerouslySetInnerHTML={{
                    __html: product?.htmlContent ?? '',
                  }}
                ></div>
              ) : (
                <p
                  style={{
                    color: data.styleData.descriptionTextColor ?? 'black',
                  }}
                  className="pw-text-sm pw-pb-8 pw-mt-6"
                >
                  {product?.description}
                </p>
              )}
            </div>
          )}
          <p></p>
        </div>
      </div>
    </div>
  );
};
