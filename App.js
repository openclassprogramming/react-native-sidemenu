// Import library
import React from 'react';
import { Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import {
  StackNavigator,
  SwitchNavigator,
  DrawerNavigator,
} from "react-navigation";

// Halaman Beranda
class HomePage extends React.Component {
  static navigationOptions = {
    title: 'BERANDA',
    headerTintColor: '#000000',
    headerStyle: {
      backgroundColor: '#DCA115',
    },
    headerTitleStyle: {
      fontSize: 15,
      fontFamily: 'sans-serif'
    },
    headerLeft: (
      <TouchableOpacity
        onPress={() => this.openSideMenu()}
      >
        <Image
          source={require('./assets/side.png')}
          style={{ marginLeft: 22 }}
        />
      </TouchableOpacity>
    )
  };

  componentWillMount() {
    openSideMenu = () => {
      this.props.navigation.openDrawer(); // <-- fungsi membuka side menu
    }
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#000000', fontFamily: 'sans-serif-medium' }}>Beranda</Text>
      </View>
    );
  }
}

// Halaman Berita
class Berita extends React.Component {
  static navigationOptions = {
    title: 'BERITA',
    headerTintColor: '#000000',
    headerStyle: {
      backgroundColor: '#DCA115',
    },
    headerTitleStyle: {
      fontSize: 15,
      fontFamily: 'sans-serif'
    }
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#000000', fontFamily: 'sans-serif-medium' }}>Berita</Text>
      </View>
    );
  }
}

// Halaman Pengaturan
class Pengaturan extends React.Component {
  static navigationOptions = {
    title: 'PENGATURAN',
    headerTintColor: '#000000',
    headerStyle: {
      backgroundColor: '#DCA115',
    },
    headerTitleStyle: {
      fontSize: 15,
      fontFamily: 'sans-serif'
    }
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#000000', fontFamily: 'sans-serif-medium' }}>Pengaturan</Text>
      </View>
    );
  }
}

// List item side menu
class SideMenuList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      dataSource: [
        { menu: 'Beranda', action: 'beranda' },
        { menu: 'Berita', action: 'berita' },
        { menu: 'Pengaturan', action: 'pengaturan' },
      ],
    }
  }

  keMenu(pilih) {
    switch (pilih) {
      case 'beranda':
        this.props.navigation.navigate('HomePage');
        break;
      case 'berita':
        this.props.navigation.navigate('Berita');
        break;
      case 'pengaturan':
        this.props.navigation.navigate('Pengaturan');
        break;

      default:
        break;
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ marginTop: 10 }}
          data={this.state.dataSource}
          keyExtractor={(item, index) => item.action}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => this.keMenu(item.action)}
                style={{
                  borderBottomWidth: 1, borderBottomColor: '#000000'
                }}
              >
                <View style={{ marginBottom: 10, padding: 10 }} >
                  <Text style={{ fontFamily: 'sans-serif-medium', color: '#000000' }}>{item.menu}</Text>
                </View>
              </TouchableOpacity>
            )
          }}
        />
      </View>
    );
  }
}

const NavigasiPages = StackNavigator({
  HomePage: {
    screen: HomePage
  },
  Berita: {
    screen: Berita
  },
  Pengaturan: {
    screen: Pengaturan
  }
}, {
    initialRouteName: 'HomePage'
  });

const HomeDrawer = DrawerNavigator({
  DrawerPage: {
    screen: NavigasiPages
  }
}, {
    initialRouteName: 'DrawerPage',
    contentComponent: SideMenuList
  });

const RootApp = SwitchNavigator(
  {
    InitDrawer: {
      screen: HomeDrawer
    },
    InitNav: {
      screen: NavigasiPages
    },
  },
  {
    initialRouteName: "InitDrawer",
  }
);

export default RootApp;
