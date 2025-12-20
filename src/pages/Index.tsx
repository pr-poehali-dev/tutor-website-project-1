import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Tutor {
  id: number;
  name: string;
  subject: string;
  rating: number;
  reviews: number;
  price: number;
  experience: number;
  avatar: string;
  description: string;
  education: string;
  achievements: string[];
  schedule: ScheduleSlot[];
}

interface ScheduleSlot {
  day: string;
  time: string;
  available: boolean;
}

const tutors: Tutor[] = [
  {
    id: 1,
    name: 'Анна Петрова',
    subject: 'Математика',
    rating: 4.9,
    reviews: 127,
    price: 1500,
    experience: 8,
    avatar: 'https://cdn.poehali.dev/projects/38735859-5a8d-4dd4-a4c9-0fb4e631e70e/files/b79d810a-d9fa-457f-a40e-776ebdd59767.jpg',
    description: 'Преподаю математику с любовью к предмету. Помогу подготовиться к ЕГЭ и ОГЭ, объясню сложные темы простым языком.',
    education: 'МГУ им. Ломоносова, механико-математический факультет',
    achievements: ['Подготовила 50+ учеников к ЕГЭ', 'Средний балл учеников: 87', 'Призёр олимпиад'],
    schedule: [
      { day: 'Понедельник', time: '10:00', available: true },
      { day: 'Понедельник', time: '14:00', available: false },
      { day: 'Вторник', time: '16:00', available: true },
      { day: 'Среда', time: '10:00', available: true },
      { day: 'Четверг', time: '18:00', available: true },
      { day: 'Пятница', time: '14:00', available: true },
    ]
  },
  {
    id: 2,
    name: 'Дмитрий Соколов',
    subject: 'Английский язык',
    rating: 5.0,
    reviews: 93,
    price: 1800,
    experience: 12,
    avatar: 'https://cdn.poehali.dev/projects/38735859-5a8d-4dd4-a4c9-0fb4e631e70e/files/1d8ce158-d973-445f-9bc3-1cab8a855028.jpg',
    description: 'Носитель английского языка. Специализируюсь на разговорной практике и подготовке к международным экзаменам.',
    education: 'МГЛУ, переводческий факультет',
    achievements: ['Cambridge CELTA', '200+ учеников успешно сдали IELTS', 'Опыт преподавания за рубежом'],
    schedule: [
      { day: 'Понедельник', time: '09:00', available: true },
      { day: 'Вторник', time: '11:00', available: true },
      { day: 'Среда', time: '15:00', available: false },
      { day: 'Четверг', time: '09:00', available: true },
      { day: 'Пятница', time: '17:00', available: true },
    ]
  },
  {
    id: 3,
    name: 'Елена Волкова',
    subject: 'Физика',
    rating: 4.8,
    reviews: 68,
    price: 1400,
    experience: 6,
    avatar: 'https://cdn.poehali.dev/projects/38735859-5a8d-4dd4-a4c9-0fb4e631e70e/files/8cb6c900-e702-4bbc-9fc5-0367b15f4020.jpg',
    description: 'Увлеченный преподаватель физики. Делаю упор на понимание, а не зубрёжку. Интерактивные уроки с экспериментами.',
    education: 'МФТИ, факультет общей и прикладной физики',
    achievements: ['Победитель Всероссийской олимпиады', 'Автор образовательных видео', 'Эксперт ЕГЭ'],
    schedule: [
      { day: 'Понедельник', time: '13:00', available: true },
      { day: 'Вторник', time: '10:00', available: true },
      { day: 'Среда', time: '16:00', available: true },
      { day: 'Четверг', time: '13:00', available: false },
      { day: 'Пятница', time: '10:00', available: true },
    ]
  },
  {
    id: 4,
    name: 'Ольга Морозова',
    subject: 'Русский язык',
    rating: 4.9,
    reviews: 156,
    price: 1600,
    experience: 10,
    avatar: 'https://cdn.poehali.dev/projects/38735859-5a8d-4dd4-a4c9-0fb4e631e70e/files/b79d810a-d9fa-457f-a40e-776ebdd59767.jpg',
    description: 'Кандидат филологических наук. Готовлю к ЕГЭ по русскому языку и литературе. Индивидуальный подход к каждому ученику.',
    education: 'МГУ им. Ломоносова, филологический факультет',
    achievements: ['98% учеников сдают ЕГЭ на 85+', 'Эксперт ЕГЭ', 'Автор методических пособий'],
    schedule: [
      { day: 'Понедельник', time: '15:00', available: true },
      { day: 'Вторник', time: '12:00', available: true },
      { day: 'Среда', time: '15:00', available: true },
      { day: 'Четверг', time: '12:00', available: true },
      { day: 'Пятница', time: '15:00', available: false },
    ]
  },
  {
    id: 5,
    name: 'Игорь Лебедев',
    subject: 'Программирование',
    rating: 5.0,
    reviews: 84,
    price: 2000,
    experience: 7,
    avatar: 'https://cdn.poehali.dev/projects/38735859-5a8d-4dd4-a4c9-0fb4e631e70e/files/1d8ce158-d973-445f-9bc3-1cab8a855028.jpg',
    description: 'Практикующий программист и преподаватель. Обучаю Python, JavaScript, веб-разработке. От основ до профессионального уровня.',
    education: 'МФТИ, прикладная математика и информатика',
    achievements: ['Senior Developer в IT-компании', 'Подготовил 30+ junior разработчиков', 'Автор онлайн-курсов'],
    schedule: [
      { day: 'Понедельник', time: '19:00', available: true },
      { day: 'Вторник', time: '19:00', available: true },
      { day: 'Среда', time: '19:00', available: true },
      { day: 'Четверг', time: '19:00', available: false },
      { day: 'Пятница', time: '19:00', available: true },
    ]
  },
  {
    id: 6,
    name: 'Мария Кузнецова',
    subject: 'Химия',
    rating: 4.7,
    reviews: 52,
    price: 1500,
    experience: 5,
    avatar: 'https://cdn.poehali.dev/projects/38735859-5a8d-4dd4-a4c9-0fb4e631e70e/files/8cb6c900-e702-4bbc-9fc5-0367b15f4020.jpg',
    description: 'Влюблена в химию и делюсь этой любовью с учениками. Понятные объяснения, много практики, подготовка к экзаменам.',
    education: 'МГУ им. Ломоносова, химический факультет',
    achievements: ['Призёр химических олимпиад', 'Средний балл ЕГЭ учеников: 82', 'Эксперт по органической химии'],
    schedule: [
      { day: 'Понедельник', time: '11:00', available: true },
      { day: 'Вторник', time: '14:00', available: true },
      { day: 'Среда', time: '11:00', available: false },
      { day: 'Четверг', time: '14:00', available: true },
      { day: 'Пятница', time: '11:00', available: true },
    ]
  },
];

const subjects = ['Все предметы', 'Математика', 'Английский язык', 'Физика', 'Русский язык', 'Программирование', 'Химия'];

export default function Index() {
  const [selectedSubject, setSelectedSubject] = useState('Все предметы');
  const [priceRange, setPriceRange] = useState([1000, 2500]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<ScheduleSlot | null>(null);

  const filteredTutors = tutors.filter(tutor => {
    const matchesSubject = selectedSubject === 'Все предметы' || tutor.subject === selectedSubject;
    const matchesPrice = tutor.price >= priceRange[0] && tutor.price <= priceRange[1];
    const matchesSearch = tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         tutor.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesPrice && matchesSearch;
  });

  const handleBooking = (slot: ScheduleSlot) => {
    if (slot.available) {
      setSelectedSlot(slot);
      alert(`Занятие забронировано!\nРепетитор: ${selectedTutor?.name}\nДень: ${slot.day}\nВремя: ${slot.time}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Icon name="GraduationCap" className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold text-primary">РЕПЕТИТОР.ру</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#catalog" className="text-sm font-medium hover:text-primary transition-colors">Каталог</a>
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">О нас</a>
            <a href="#contacts" className="text-sm font-medium hover:text-primary transition-colors">Контакты</a>
            <Button variant="outline" size="sm">
              <Icon name="User" size={16} className="mr-2" />
              Войти
            </Button>
          </nav>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Icon name="Menu" size={24} />
          </Button>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <Badge className="bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/20">
                <Icon name="Sparkles" size={14} className="mr-1" />
                Лучшие репетиторы России
              </Badge>
              <h2 className="text-5xl lg:text-6xl font-bold leading-tight">
                Найди своего
                <span className="block text-primary">идеального репетитора</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl">
                Тысячи проверенных преподавателей готовы помочь в достижении твоих образовательных целей. Индивидуальный подход, удобное расписание, гарантия результата.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="text-lg px-8">
                  <Icon name="Search" size={20} className="mr-2" />
                  Найти репетитора
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8">
                  <Icon name="Play" size={20} className="mr-2" />
                  Как это работает
                </Button>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-primary">5000+</div>
                  <div className="text-sm text-muted-foreground">Репетиторов</div>
                </div>
                <div className="w-px h-12 bg-border"></div>
                <div>
                  <div className="text-3xl font-bold text-primary">4.8</div>
                  <div className="text-sm text-muted-foreground">Средний рейтинг</div>
                </div>
                <div className="w-px h-12 bg-border"></div>
                <div>
                  <div className="text-3xl font-bold text-primary">50K+</div>
                  <div className="text-sm text-muted-foreground">Довольных учеников</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-3xl blur-3xl"></div>
              <img 
                src="https://cdn.poehali.dev/projects/38735859-5a8d-4dd4-a4c9-0fb4e631e70e/files/1d8ce158-d973-445f-9bc3-1cab8a855028.jpg"
                alt="Обучение"
                className="relative rounded-3xl shadow-2xl animate-scale-in"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Каталог репетиторов</h2>
            <p className="text-muted-foreground text-lg">Выбери предмет и найди лучшего преподавателя</p>
          </div>

          <Card className="mb-8 border-2 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Filter" size={20} />
                Фильтры поиска
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Поиск по имени или предмету</label>
                  <Input 
                    placeholder="Введите запрос..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Предмет</label>
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map(subject => (
                        <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Цена за час: {priceRange[0]} - {priceRange[1]} ₽
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={1000}
                    max={2500}
                    step={100}
                    className="w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutors.map((tutor, index) => (
              <Card 
                key={tutor.id} 
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16 border-2 border-primary">
                      <AvatarImage src={tutor.avatar} />
                      <AvatarFallback>{tutor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">{tutor.name}</CardTitle>
                      <Badge variant="secondary" className="mb-2">
                        <Icon name="BookOpen" size={12} className="mr-1" />
                        {tutor.subject}
                      </Badge>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={14} className="fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{tutor.rating}</span>
                        </div>
                        <span className="text-muted-foreground">({tutor.reviews} отзывов)</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-3">{tutor.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Icon name="Briefcase" size={14} />
                      <span>{tutor.experience} лет опыта</span>
                    </div>
                    <div className="text-lg font-bold text-primary">{tutor.price} ₽/час</div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full" onClick={() => setSelectedTutor(tutor)}>
                        <Icon name="Calendar" size={16} className="mr-2" />
                        Посмотреть профиль
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl">Профиль репетитора</DialogTitle>
                        <DialogDescription>Подробная информация и расписание</DialogDescription>
                      </DialogHeader>
                      
                      {selectedTutor && (
                        <Tabs defaultValue="profile" className="w-full">
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="profile">Профиль</TabsTrigger>
                            <TabsTrigger value="reviews">Отзывы</TabsTrigger>
                            <TabsTrigger value="schedule">Расписание</TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="profile" className="space-y-6">
                            <div className="flex items-start gap-6">
                              <Avatar className="w-24 h-24 border-4 border-primary">
                                <AvatarImage src={selectedTutor.avatar} />
                                <AvatarFallback>{selectedTutor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <h3 className="text-2xl font-bold mb-2">{selectedTutor.name}</h3>
                                <div className="flex items-center gap-3 mb-3">
                                  <Badge variant="secondary" className="text-base">
                                    <Icon name="BookOpen" size={14} className="mr-1" />
                                    {selectedTutor.subject}
                                  </Badge>
                                  <div className="flex items-center gap-1">
                                    <Icon name="Star" size={16} className="fill-yellow-400 text-yellow-400" />
                                    <span className="font-semibold">{selectedTutor.rating}</span>
                                    <span className="text-muted-foreground">({selectedTutor.reviews})</span>
                                  </div>
                                </div>
                                <div className="text-2xl font-bold text-primary">{selectedTutor.price} ₽/час</div>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                  <Icon name="User" size={16} />
                                  О себе
                                </h4>
                                <p className="text-muted-foreground">{selectedTutor.description}</p>
                              </div>

                              <div>
                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                  <Icon name="GraduationCap" size={16} />
                                  Образование
                                </h4>
                                <p className="text-muted-foreground">{selectedTutor.education}</p>
                              </div>

                              <div>
                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                  <Icon name="Award" size={16} />
                                  Достижения
                                </h4>
                                <ul className="space-y-2">
                                  {selectedTutor.achievements.map((achievement, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                      <Icon name="Check" size={16} className="text-primary mt-1 flex-shrink-0" />
                                      <span className="text-muted-foreground">{achievement}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div className="flex items-center gap-2 p-4 bg-accent rounded-lg">
                                <Icon name="Briefcase" size={20} className="text-primary" />
                                <span className="font-medium">Опыт преподавания: {selectedTutor.experience} лет</span>
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="reviews" className="space-y-4">
                            <div className="text-center py-8">
                              <Icon name="MessageSquare" size={48} className="mx-auto text-muted-foreground mb-4" />
                              <p className="text-muted-foreground">Отзывы появятся в следующей версии</p>
                            </div>
                          </TabsContent>

                          <TabsContent value="schedule" className="space-y-4">
                            <div className="bg-accent/50 p-4 rounded-lg mb-4">
                              <h4 className="font-semibold mb-2 flex items-center gap-2">
                                <Icon name="Calendar" size={16} />
                                Доступное расписание
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                Выберите удобное время для занятия. Зеленым отмечены свободные слоты.
                              </p>
                            </div>
                            
                            <div className="grid gap-3">
                              {selectedTutor.schedule.map((slot, idx) => (
                                <div 
                                  key={idx}
                                  className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                                    slot.available 
                                      ? 'border-primary/20 bg-primary/5 hover:border-primary hover:bg-primary/10 cursor-pointer' 
                                      : 'border-gray-200 bg-gray-50 opacity-60'
                                  }`}
                                  onClick={() => slot.available && handleBooking(slot)}
                                >
                                  <div className="flex items-center gap-3">
                                    <div className={`w-3 h-3 rounded-full ${slot.available ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                                    <div>
                                      <div className="font-medium">{slot.day}</div>
                                      <div className="text-sm text-muted-foreground">{slot.time}</div>
                                    </div>
                                  </div>
                                  {slot.available ? (
                                    <Button size="sm">
                                      <Icon name="Check" size={14} className="mr-1" />
                                      Забронировать
                                    </Button>
                                  ) : (
                                    <Badge variant="secondary">Занято</Badge>
                                  )}
                                </div>
                              ))}
                            </div>
                          </TabsContent>
                        </Tabs>
                      )}
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredTutors.length === 0 && (
            <div className="text-center py-16">
              <Icon name="SearchX" size={64} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-2xl font-bold mb-2">Репетиторы не найдены</h3>
              <p className="text-muted-foreground">Попробуйте изменить параметры фильтра</p>
            </div>
          )}
        </div>
      </section>

      <section id="contacts" className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Остались вопросы?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Свяжитесь с нами, и мы поможем найти идеального репетитора
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="outline" className="gap-2">
                <Icon name="Mail" size={20} />
                info@репетитор.ру
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Icon name="Phone" size={20} />
                +7 (495) 123-45-67
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Icon name="MessageCircle" size={20} />
                Написать в поддержку
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="GraduationCap" className="text-white" size={18} />
              </div>
              <span className="font-bold text-primary">РЕПЕТИТОР.ру</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 РЕПЕТИТОР.ру. Все права защищены.
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Facebook" size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Instagram" size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Youtube" size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
