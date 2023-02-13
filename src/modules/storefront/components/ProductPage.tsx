import { useRouterConnect } from '../../shared';
import { ReactComponent as BackButton } from '../../shared/assets/icons/arrowLeftOutlined.svg';
import { ImageSDK } from '../../shared/components/ImageSDK';
import useGetProductBySlug from '../hooks/useGetProductBySlug/useGetProductBySlug';
import { ProductPageData } from '../interfaces';

interface ProductPageProps {
  data: ProductPageData;
  params?: string[];
}

export const ProductPage = ({ data, params }: ProductPageProps) => {
  const { back } = useRouterConnect();
  const { data: product } = useGetProductBySlug(params?.[params.length - 1]);
  const categories = [{ name: 'tenis' }, { name: 'nike' }];
  return (
    <div>
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
            className="pw-font-poppins pw-text-sm"
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
          <div className="pw-flex pw-w-full pw-gap-8">
            <div className="pw-max-h-[500px]  pw-flex-1">
              <ImageSDK
                className="pw-w-full pw-max-h-[500px] pw-object-cover pw-object-center"
                src={product?.images[0].original}
              />
            </div>
            <div className="pw-max-w-[400px] pw-w-full">
              {data.styleData.showProductName && (
                <>
                  <p
                    style={{ color: data.styleData.textColor ?? 'black' }}
                    className="pw-font-poppins pw-text-sm"
                  >
                    Título ou nome do item
                  </p>
                  <p
                    style={{ color: data.styleData.nameTextColor ?? 'black' }}
                    className="pw-font-poppins pw-text-[36px] pw-font-[600]"
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
                  className="pw-mt-4 pw-font-poppins pw-font-[700] pw-text-lg"
                >
                  {product?.tags?.join('/')}
                </p>
              )}
              {data.styleData.showValue && (
                <p
                  style={{ color: data.styleData.priceTextColor ?? 'black' }}
                  className="pw-font-poppins pw-text-2xl pw-mt-4 pw-font-[700]"
                >
                  {product?.prices[0].currency.symbol}{' '}
                  {product?.prices[0].amount}
                </p>
              )}
              {data.styleData.showCategory && product?.tags?.length ? (
                <>
                  <p
                    style={{ color: data.styleData.textColor ?? 'black' }}
                    className="pw-mt-4 pw-font-poppins pw-text-sm"
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
                        className="pw-py-2 pw-px-6 pw-text-sm pw-font-[600] pw-font-poppins pw-shadow-[0_2px_4px_rgba(0,0,0,0.26)]"
                      >
                        {cat.name}
                      </div>
                    ))}
                  </div>
                </>
              ) : null}
              {data.styleData.actionButton && (
                <button
                  style={{
                    backgroundColor: data.styleData.buttonColor ?? '#0050FF',
                    color: data.styleData.buttonTextColor ?? 'white',
                  }}
                  className="pw-py-[10px] pw-px-[60px] pw-font-[500] pw-text-xs pw-font-poppins pw-mt-6 pw-rounded-full pw-shadow-[0_2px_4px_rgba(0,0,0,0.26)]"
                >
                  {data.styleData.buttonText ?? 'Comprar agora'}
                </button>
              )}
            </div>
          </div>
          {data.styleData.showDescription && (
            <>
              <p
                style={{
                  color: data.styleData.descriptionTextColor ?? 'black',
                }}
                className="pw-text-2xl pw-font-[600] pw-font-poppins pw-mt-3"
              >
                Descrição
              </p>
              <p
                style={{
                  color: data.styleData.descriptionTextColor ?? 'black',
                }}
                className="pw-font-poppins pw-text-sm pw-pb-8 pw-mt-6"
              >
                {product?.description}
              </p>
            </>
          )}
          <p></p>
        </div>
      </div>
    </div>
  );
};