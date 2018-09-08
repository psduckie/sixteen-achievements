using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Navigation;

// The Blank Page item template is documented at https://go.microsoft.com/fwlink/?LinkId=402352&clcid=0x409

namespace SixteenAchievements
{
    public enum Faction {Unselected, Exile, Dominion};
    public enum Race {Unselected, Human, Granok, Aurin, Mordesh, Cassian, Draken, Mechari, Chua}; // 1-4: Exile, 5-8: Dominion
    public enum Class {Unselected, Warrior, Stalker, Spellslinger, Esper, Medic, Engineer};
    public enum Path {Unselected, Explorer, Soldier, Scientist, Settler};

    public sealed partial class MainPage : Page
    {
        private Faction charFaction;
        private Race charRace;
        private Class charClass;
        private Path charPath;

        public MainPage()
        {
            this.InitializeComponent();
        }

        private void btnFaction_Click(object sender, RoutedEventArgs e)
        {
            Random rand = new Random();
            charFaction = (Faction)rand.Next(1, 3);
            btnFaction.Label = charFaction.ToString();
        }

        private void btnClass_Click(object sender, RoutedEventArgs e)
        {
            Random rand = new Random();
            charClass = (Class)rand.Next(1, 7);
            btnClass.Label = charClass.ToString();
        }
    }
}
