import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// Template definitions
const templates = {
  basic: BasicTemplate,
  blog: BlogTemplate,
  product: ProductTemplate,
  social: SocialTemplate,
  minimal: MinimalTemplate,
  gradient: GradientTemplate,
};

type TemplateProps = {
  title: string;
  subtitle?: string;
  image?: string;
  logo?: string;
  author?: string;
  date?: string;
  theme?: 'light' | 'dark';
  primaryColor?: string;
  secondaryColor?: string;
};

function BasicTemplate({ title, subtitle, logo, theme = 'dark', primaryColor = '#6366f1' }: TemplateProps) {
  const isDark = theme === 'dark';
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isDark ? '#0f172a' : '#ffffff',
        padding: '40px 80px',
      }}
    >
      {logo && (
        <img
          src={logo}
          alt="Logo"
          style={{ width: 80, height: 80, marginBottom: 30, borderRadius: 12 }}
        />
      )}
      <div
        style={{
          fontSize: 60,
          fontWeight: 700,
          color: isDark ? '#ffffff' : '#0f172a',
          textAlign: 'center',
          lineHeight: 1.2,
          maxWidth: '90%',
        }}
      >
        {title}
      </div>
      {subtitle && (
        <div
          style={{
            fontSize: 30,
            color: isDark ? '#94a3b8' : '#64748b',
            marginTop: 20,
            textAlign: 'center',
          }}
        >
          {subtitle}
        </div>
      )}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 8,
          backgroundColor: primaryColor,
        }}
      />
    </div>
  );
}

function BlogTemplate({ title, author, date, image, theme = 'dark', primaryColor = '#6366f1' }: TemplateProps) {
  const isDark = theme === 'dark';
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        backgroundColor: isDark ? '#0f172a' : '#ffffff',
      }}
    >
      {image && (
        <div style={{ width: '45%', height: '100%', display: 'flex' }}>
          <img
            src={image}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      )}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: isDark ? '#ffffff' : '#0f172a',
            lineHeight: 1.2,
            marginBottom: 30,
          }}
        >
          {title}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {author && (
            <div style={{ fontSize: 24, color: primaryColor, fontWeight: 600 }}>
              {author}
            </div>
          )}
          {date && (
            <div style={{ fontSize: 20, color: isDark ? '#64748b' : '#94a3b8' }}>
              {date}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProductTemplate({ title, subtitle, image, logo, primaryColor = '#6366f1' }: TemplateProps) {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        padding: '60px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, paddingRight: 40 }}>
        {logo && (
          <img
            src={logo}
            alt="Logo"
            style={{ width: 60, height: 60, marginBottom: 24 }}
          />
        )}
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: '#0f172a',
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div style={{ fontSize: 26, color: '#64748b', lineHeight: 1.4 }}>
            {subtitle}
          </div>
        )}
        <div
          style={{
            marginTop: 32,
            padding: '12px 32px',
            backgroundColor: primaryColor,
            color: '#ffffff',
            fontSize: 20,
            fontWeight: 600,
            borderRadius: 8,
            alignSelf: 'flex-start',
          }}
        >
          Learn More →
        </div>
      </div>
      {image && (
        <img
          src={image}
          alt=""
          style={{ width: 400, height: 400, objectFit: 'contain' }}
        />
      )}
    </div>
  );
}

function SocialTemplate({ title, author, image, theme = 'dark' }: TemplateProps) {
  const isDark = theme === 'dark';
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isDark ? '#15202b' : '#ffffff',
        padding: '60px',
      }}
    >
      {image && (
        <img
          src={image}
          alt=""
          style={{ width: 120, height: 120, borderRadius: '50%', marginBottom: 30 }}
        />
      )}
      <div
        style={{
          fontSize: 48,
          fontWeight: 600,
          color: isDark ? '#ffffff' : '#0f172a',
          textAlign: 'center',
          lineHeight: 1.3,
          maxWidth: '85%',
        }}
      >
        "{title}"
      </div>
      {author && (
        <div
          style={{
            fontSize: 28,
            color: isDark ? '#8899a6' : '#657786',
            marginTop: 30,
          }}
        >
          — {author}
        </div>
      )}
    </div>
  );
}

function MinimalTemplate({ title, subtitle, theme = 'light', primaryColor = '#0f172a' }: TemplateProps) {
  const isDark = theme === 'dark';
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: isDark ? '#0f172a' : '#fafafa',
        padding: '80px 100px',
      }}
    >
      <div
        style={{
          fontSize: 72,
          fontWeight: 800,
          color: primaryColor,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
        }}
      >
        {title}
      </div>
      {subtitle && (
        <div
          style={{
            fontSize: 32,
            color: isDark ? '#64748b' : '#94a3b8',
            marginTop: 24,
            fontWeight: 400,
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
}

function GradientTemplate({ title, subtitle, primaryColor = '#6366f1', secondaryColor = '#ec4899' }: TemplateProps) {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
        padding: '60px 80px',
      }}
    >
      <div
        style={{
          fontSize: 64,
          fontWeight: 700,
          color: '#ffffff',
          textAlign: 'center',
          lineHeight: 1.2,
          textShadow: '0 2px 20px rgba(0,0,0,0.2)',
        }}
      >
        {title}
      </div>
      {subtitle && (
        <div
          style={{
            fontSize: 28,
            color: 'rgba(255,255,255,0.9)',
            marginTop: 24,
            textAlign: 'center',
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract parameters
    const template = (searchParams.get('template') || 'basic') as keyof typeof templates;
    const title = searchParams.get('title') || 'Hello World';
    const subtitle = searchParams.get('subtitle') || undefined;
    const image = searchParams.get('image') || undefined;
    const logo = searchParams.get('logo') || undefined;
    const author = searchParams.get('author') || undefined;
    const date = searchParams.get('date') || undefined;
    const theme = (searchParams.get('theme') || 'dark') as 'light' | 'dark';
    const primaryColor = searchParams.get('primaryColor') || searchParams.get('color') || '#6366f1';
    const secondaryColor = searchParams.get('secondaryColor') || '#ec4899';
    const width = parseInt(searchParams.get('width') || '1200');
    const height = parseInt(searchParams.get('height') || '630');

    const TemplateComponent = templates[template] || templates.basic;

    return new ImageResponse(
      <TemplateComponent
        title={title}
        subtitle={subtitle}
        image={image}
        logo={logo}
        author={author}
        date={date}
        theme={theme}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />,
      {
        width,
        height,
      }
    );
  } catch (error: unknown) {
    console.error('Error generating image:', error);
    return new Response(`Error generating image: ${error instanceof Error ? error.message : 'Unknown error'}`, { status: 500 });
  }
}
