import Menu from "../../containers/Menu"; // Import du composant Menu
import ServiceCard from "../../components/ServiceCard"; // Import du composant ServiceCard
import EventCard from "../../components/EventCard"; // Import du composant EventCard
import PeopleCard from "../../components/PeopleCard"; // Import du composant PeopleCard

// Import des fichiers de style
import "./style.scss";
import EventList from "../../containers/Events"; // Import du composant EventList
import Slider from "../../containers/Slider"; // Import du composant Slider
import Logo from "../../components/Logo"; // Import du composant Logo
import Icon from "../../components/Icon"; // Import du composant Icon
import Form from "../../containers/Form"; // Import du composant Form
import Modal from "../../containers/Modal"; // Import du composant Modal
import { useData } from "../../contexts/DataContext"; // Import du hook useData depuis le contexte DataContext

const Page = () => {
  const {data} = useData()   // Utilisation du hook useData pour obtenir les données  MODIF ICI CAR LAST WAS NOT DEFINED
  const {last}  = data || {};  // le || {} evite le undefined et les problemes ATTENTION last =[{...}]
  
   
  return (
    <>
      <header>
        <Menu /> {/* Affichage du composant Menu dans l'en-tête */}
      </header>
      <main>
        <section className="SliderContainer">
          <Slider /> {/* Affichage du composant Slider dans la section SliderContainer */}
        </section>
        <section className="ServicesContainer">
          <h2 className="Title">Nos services</h2>
          <p>Nous organisons des événements sur mesure partout dans le monde</p>
          <div className="ListContainer">
            {/* Affichage des cartes de service */}
            <ServiceCard imageSrc="/images/priscilla-du-preez-Q7wGvnbuwj0-unsplash1.png">
              <h3>Soirée d’entreprise</h3>
              Une soirée d’entreprise vous permet de réunir vos équipes pour un
              moment convivial afin de valoriser votre société en projetant une
              image dynamique. Nous vous proposons d’organiser pour vous vos
              diners et soirée d’entreprise
            </ServiceCard>
            <ServiceCard imageSrc="/images/hall-expo.png">
              <h3>Conférences</h3>
              724 events vous propose d’organiser votre évènement, quelle que soit
              sa taille, en s’adaptant à votre demande et à vos demandes. En tant
              que spécialistes de l’évènementiel, nous saurons trouver le lieu
              parfait ainsi que des solutions inédites pour capter votre audience
              et faire de cet évènement un succès
            </ServiceCard>
            <ServiceCard imageSrc="/images/sophia-sideri-LFXMtUuAKK8-unsplash1.png">
              <h3>Experience digitale</h3>
              Notre agence experte en contenus immersifs offre des services de
              conseil aux entreprises, pour l’utilisation de la réalité virtuelle,
              de la réalité augmentée et de la réalité mixte de l’animation
              événementielle, à la veille technologique jusqu’au développement de
              module de formation innovant
            </ServiceCard>
          </div>
        </section>
        <section className="EventsContainer">
          <h2 className="Title">Nos réalisations</h2>
          <EventList /> {/* Affichage de la liste des événements */}
        </section>
        <section className="PeoplesContainer">
          <h2 className="Title">Notre équipe</h2>
          <p>Une équipe d’experts dédiés à l’ogranisation de vos événements</p>
          <div className="ListContainer">
            {/* Affichage des cartes des membres de l'équipe */}
            <PeopleCard
              imageSrc="/images/stephanie-liverani-Zz5LQe-VSMY-unsplash.png"
              name="Samira"
              position="CEO"
            />
            <PeopleCard
              imageSrc="/images/linkedin-sales-solutions-pAtA8xe_iVM-unsplash.png"
              name="Jean-baptiste"
              position="Directeur marketing"
            />
            <PeopleCard
              imageSrc="/images/christina-wocintechchat-com-SJvDxw0azqw-unsplash.png"
              name="Alice"
              position="CXO"
            />
            <PeopleCard
              imageSrc="/images/jonas-kakaroto-KIPqvvTOC1s-unsplash.png"
              name="Luís"
              position="Animateur"
            />
            <PeopleCard
              imageSrc="/images/amy-hirschi-b3AYk8HKCl0-unsplash1.png"
              name="Christine"
              position="VP animation"
            />
            <PeopleCard
              imageSrc="/images/christina-wocintechchat-com-0Zx1bDv5BNY-unsplash.png"
              name="Isabelle"
              position="VP communication"
            />
          </div>
        </section>
        <div className="FormContainer" id="contact">
          <h2 className="Title">Contact</h2>
          {/* Affichage d'un message de succes dans une Modale */}
          <Modal
            Content={
              <div className="ModalMessage--success">
                <div>Message envoyé !</div>
                <p>
                  Merci pour votre message nous tâcherons de vous répondre dans
                  les plus brefs délais
                </p>
              </div>
            }
          >
            {({ setIsOpened }) => (
              <Form
                onSuccess={() => setIsOpened(true)}
                onError={() => null}
              />
            )}
          </Modal>
        </div>
      </main>
      <footer className="row">
        <div className="col presta">
          <h3>Notre dernière prestation</h3>
          {/* Affichage de la dernière prestation dans une carte d'événement */}
          {/* ICI MODIF DE CODE  last&& permet d'eviter d'avoir une erreur si last[0] n'est pas encore defini */}
          <EventCard
            imageSrc={last&&last[0]?.cover}
            title={last&&last[0]?.title}
            date={last&&new Date(last[0]?.date)}
            small
            label="boom"
          />
        </div>
        <div className="col contact">
          <h3>Contactez-nous</h3>
          <address>45 avenue de la République, 75000 Paris</address>
          <div>01 23 45 67 89</div>
          <div>contact@724events.com</div>
          <div>
            {/* Liens vers les réseaux sociaux */}
            <a href="#twitch">
              <Icon name="twitch" />
            </a>
            <a href="#facebook">
              <Icon name="facebook" />
            </a>
            <a href="#twitter">
              <Icon name="twitter" />
            </a>
            <a href="#youtube">
              <Icon name="youtube" />
            </a>
          </div>
        </div>
        <div className="col description">
          <Logo size="large" />
          <p>
            Une agence événementielle propose des prestations de service
            spécialisées dans la conception et l&apos;organisation de divers événements
            tels que des événements festifs, des manifestations sportives et
            culturelles, des événements professionnels
          </p>
        </div>
      </footer>
    </>
  );
}

export default Page;
