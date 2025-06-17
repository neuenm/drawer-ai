import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Code2, Database, Layers, Paintbrush, ArrowRight, Github, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const technologies = [
    { name: 'Next.js', description: 'React framework for production', icon: '⚛️' },
    { name: 'TailwindCSS', description: 'Utility-first CSS framework', icon: '🎨' },
    { name: 'Shadcn/ui', description: 'Beautiful UI components', icon: '🧩' },
    { name: 'tRPC', description: 'Type-safe API calls', icon: '🔗' },
    { name: 'Tldraw', description: 'Infinite canvas drawing', icon: '✏️' },
    { name: 'Prisma + SQLite', description: 'ORM with lightweight database', icon: '🗄️' },
  ];

  const features = [
    {
      icon: <Paintbrush className='h-6 w-6' />,
      title: 'Editor Intuitivo',
      description: 'Editor de dibujo completo con herramientas profesionales',
    },
    {
      icon: <Database className='h-6 w-6' />,
      title: 'Persistencia de Datos',
      description: 'Guarda automáticamente tus creaciones',
    },
    {
      icon: <Layers className='h-6 w-6' />,
      title: 'Modificación de Formas mediante IA',
      description: 'Funcionalidad para crear elementos en el canvas',
    },
  ];

  const requirements = [
    'Editor page con funcionalidad completa',
    'API endpoint para recuperar datos almacenados',
    'Actualización automática del store tras cambios',
    'Botón para modificar formas mediante IA',
    'API routes de Next.js para operaciones server-side',
    'Styling con TailwindCSS y componentes Shadcn',
    'tRPC para llamadas API type-safe',
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
      {/* Hero Section */}
      <section className='py-20'>
        <div className='container mx-auto px-4 text-center'>
          <div className='max-w-4xl mx-auto'>
            <Badge variant='secondary' className='mb-4'>
              Prueba Técnica - Editor de Dibujo
            </Badge>
            <h1 className='text-5xl font-bold text-gray-900 mb-6 leading-tight'>
              Bienvenido a{' '}
              <span className='bg-gradient-to-r from-gray-700 to-primary bg-clip-text text-transparent'>
                DrawApp
              </span>
            </h1>
            <p className='text-xl text-gray-600 mb-8 leading-relaxed'>
              Un editor de dibujo moderno construido con las mejores tecnologías web. Experimenta la
              potencia de tldraw integrado con Next.js, tRPC y una arquitectura type-safe.
            </p>
            <div className='flex flex-row sm:flex-row gap-4 justify-center'>
              <Link href='/drawer'>
                <Button size='lg' className='text-lg px-8' variant='default'>
                  <Paintbrush className='h-5 w-5 mr-2' />
                  Comenzar a Dibujar
                </Button>
              </Link>

              <Link href='https://github.com/neuenm/vidext' target='_blank'>
                <Button size='lg' className='text-lg px-8' variant='outline'>
                  <Github className='h-4 w-4 mr-2' />
                  GitHub{' '}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className='py-16 bg-white'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>Tecnologías Utilizadas</h2>
            <p className='text-gray-600 max-w-2xl mx-auto'>
              Esta aplicación está construida con un stack moderno de tecnologías que garantizan
              rendimiento, escalabilidad y una excelente experiencia de desarrollo.
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {technologies.map((tech, index) => (
              <Card key={index} className='text-center hover:shadow-lg transition-shadow'>
                <CardHeader className='pb-3'>
                  <div className='text-3xl mb-2'>{tech.icon}</div>
                  <CardTitle className='text-lg'>{tech.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{tech.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-16'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>Funcionalidades Principales</h2>
            <p className='text-gray-600 max-w-2xl mx-auto'>
              Descubre las características que hacen de DrawApp una herramienta poderosa para el
              dibujo digital.
            </p>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            {features.map((feature, index) => (
              <Card key={index} className='hover:shadow-lg transition-shadow justify-center'>
                <CardHeader className='justify-center flex flex-col items-center'>
                  <div className='w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4'>
                    {feature.icon}
                  </div>
                  <CardTitle className='text-lg'>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className='text-center'>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className='py-16 bg-white'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold text-gray-900 mb-4'>Requisitos Implementados</h2>
              <p className='text-gray-600'>
                Esta aplicación cumple con todos los requisitos técnicos especificados en la prueba.
              </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {requirements.map((requirement, index) => (
                <div
                  key={index}
                  className='flex items-start space-x-3 p-4 rounded-lg bg-green-50 border border-green-200'
                >
                  <CheckCircle className='h-5 w-5 text-green-600 mt-0.5 flex-shrink-0' />
                  <span className='text-gray-700'>{requirement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className='py-16'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto'>
            <Card className='border-2 border-dashed border-blue-200 bg-blue-50/50'>
              <CardHeader className='text-center'>
                <div className='w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4'>
                  <Code2 className='h-8 w-8 ' />
                </div>
                <CardTitle className='text-2xl'>Arquitectura de la Aplicación</CardTitle>
                <CardDescription className='text-lg'>
                  Diseño modular y escalable con separación clara de responsabilidades
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <h4 className='font-semibold text-gray-900 mb-3'>Frontend</h4>
                    <ul className='space-y-2 text-gray-600'>
                      <li>• Next.js App Router para navegación</li>
                      <li>• Componentes React reutilizables</li>
                      <li>• Shadcn/ui para interfaz consistente</li>
                      <li>• TailwindCSS para styling responsive</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-900 mb-3'>Backend</h4>
                    <ul className='space-y-2 text-gray-600'>
                      <li>• tRPC para APIs type-safe</li>
                      <li>• Next.js API routes</li>
                      <li>• Prisma + SQLite para persistencia de datos</li>
                    </ul>
                  </div>
                </div>
                <Separator />
                <div className='text-center'>
                  <p className='text-gray-600 mb-4'>
                    La aplicación integra tldraw como el núcleo del editor, proporcionando una
                    experiencia de dibujo fluida y profesional.
                  </p>
                  <Link href='/drawer'>
                    <Button className='bg-primary'>
                      <ArrowRight className='h-4 w-4 mr-2' />
                      Explorar el Editor
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
