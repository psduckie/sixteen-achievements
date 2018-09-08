using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.UI.Popups;
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

        private void BtnFaction_Click(object sender, RoutedEventArgs e)
        {
            RollFaction();
        }

        private void BtnClass_Click(object sender, RoutedEventArgs e)
        {
            RollClass();
        }

        private void BtnRace_Click(object sender, RoutedEventArgs e)
        {
            if(charFaction == Faction.Unselected)
            {
                NoFaction();
                return;
            }
            if(charClass == Class.Unselected)
            {
                NoClass();
                return;
            }
            RollRace();
        }

        private void RollFaction()
        {
            Random rand = new Random();
            charFaction = (Faction)rand.Next(1, 3);
            btnFaction.Label = charFaction.ToString();
        }

        private void RollClass()
        {
            Random rand = new Random();
            charClass = (Class)rand.Next(1, 7);
            btnClass.Label = charClass.ToString();
        }

        private void RollRace()
        {
            Random rand = new Random();
            switch(charClass)
            {
                case Class.Warrior:
                    switch(charFaction)
                    {
                        case Faction.Exile:
                            do
                            {
                                charRace = (Race)rand.Next(1, 5);
                            } while (charRace == Race.Aurin);
                            break;
                        case Faction.Dominion:
                            charRace = (Race)rand.Next(5, 9);
                            break;
                    }
                    break;
                case Class.Stalker:
                    switch (charFaction)
                    {
                        case Faction.Exile:
                            do
                            {
                                charRace = (Race)rand.Next(1, 5);
                            } while (charRace == Race.Granok);
                            break;
                        case Faction.Dominion:
                            do
                            {
                                charRace = (Race)rand.Next(5, 9);
                            } while (charRace == Race.Chua);
                            break;
                    }
                    break;
                case Class.Spellslinger:
                    switch (charFaction)
                    {
                        case Faction.Exile:
                            do
                            {
                                charRace = (Race)rand.Next(1, 5);
                            } while (charRace == Race.Granok);
                            break;
                        case Faction.Dominion:
                            do
                            {
                                charRace = (Race)rand.Next(5, 9);
                            } while (charRace == Race.Mechari);
                            break;
                    }
                    break;
                case Class.Esper:
                    switch (charFaction)
                    {
                        case Faction.Exile:
                            do
                            {
                                charRace = (Race)rand.Next(1, 5);
                            } while (charRace == Race.Granok || charRace == Race.Mordesh);
                            break;
                        case Faction.Dominion:
                            do
                            {
                                charRace = (Race)rand.Next(5, 9);
                            } while (charRace == Race.Draken || charRace == Race.Mechari);
                            break;
                    }
                    break;
                case Class.Medic:
                    switch (charFaction)
                    {
                        case Faction.Exile:
                            do
                            {
                                charRace = (Race)rand.Next(1, 5);
                            } while (charRace == Race.Aurin);
                            break;
                        case Faction.Dominion:
                            do
                            {
                                charRace = (Race)rand.Next(5, 9);
                            } while (charRace == Race.Draken);
                            break;
                    }
                    break;
                case Class.Engineer:
                    switch (charFaction)
                    {
                        case Faction.Exile:
                            charRace = (Race)rand.Next(1, 5);
                            break;
                        case Faction.Dominion:
                            do
                            {
                                charRace = (Race)rand.Next(5, 9);
                            } while (charRace == Race.Draken);
                            break;
                    }
                    break;
            }
            btnRace.Label = charRace.ToString();
        }

        private void NoFaction()
        {
            UICommand ok = new UICommand("OK");
            ShowMessage("Error", "In order to complete this roll, the faction must first be rolled.", ok);
        }

        private void NoClass()
        {
            UICommand ok = new UICommand("OK");
            ShowMessage("Error", "In order to complete this roll, the class must first be rolled.", ok);
        }

        private async void ShowMessage(string title, string text, UICommand button1)
        {
            MessageDialog dialog = new MessageDialog(text, title);
            dialog.Commands.Add(button1);
            await dialog.ShowAsync();
        }

        private async void ShowMessage(string title, string text, UICommand button1, UICommand button2, UICommand result)
        {
            MessageDialog dialog = new MessageDialog(text, title);
            dialog.Commands.Add(button1);
            dialog.Commands.Add(button2);
            result = (UICommand)await dialog.ShowAsync();
        }
    }
}
