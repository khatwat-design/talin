import type { Product } from "./products";

type StructuredDataProps = {
  product?: Product;
  breadcrumbs?: Array<{ name: string; url: string }>;
};

export function ProductStructuredData({ product }: StructuredDataProps) {
  if (!product) return null;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const currency = process.env.NEXT_PUBLIC_STORE_CURRENCY || "USD";

  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `${siteUrl}${product.image}`,
    brand: {
      "@type": "Brand",
      name: "Talin Beauty",
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: currency,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "50",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function FaqStructuredData() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "هل يناسب جميع أنواع الشعر؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "نعم، يناسب معظم أنواع الشعر.",
        },
      },
      {
        "@type": "Question",
        name: "كم مرة يستخدم؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "حسب طبيعة الشعر وطريقة الاستخدام — يُنصح باستخدامه بانتظام للحصول على أفضل النتائج.",
        },
      },
      {
        "@type": "Question",
        name: "هل يناسب الشعر المصبوغ؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "نعم، يمكن استخدامه ضمن روتين العناية بالشعر المصبوغ.",
        },
      },
      {
        "@type": "Question",
        name: "متى تظهر النتائج؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "تختلف من شخص لآخر حسب طبيعة الشعر والاستمرارية.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
    />
  );
}

export function OrganizationStructuredData() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Talin Beauty",
    alternateName: "تالين بيوتي",
    url: siteUrl,
    logo: `${siteUrl}/images/logo.png`,
    description: "زيت شعر طبيعي 100% — لعناية يومية بفخامة ونعومة.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["Arabic"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
